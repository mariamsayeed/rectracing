"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MENU_ITEMS } from "../constants";
import { actionItemClick } from "../slice/menuSlice";

import { socket } from "../socket";
import styles from './index.module.css';
import useDarkMode from "../useDarkMode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';


interface RootState {
  menu: {
    activeMenuItem: string;
    actionMenuItem: string;
  };
  toolbox: {
    [key: string]: {
      type: string;
      color: string;
      size: number;
    };
  };
}

const Home: React.FC = () => {
  const [colorTheme, setTheme] = useDarkMode();

  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef<number>(0);
  const shouldDraw = useRef<boolean>(false);

  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: RootState) => state.menu
  );
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d")!;
      if (activeMenuItem === 'ERASER') {
        canvasRef.current.style.cursor = 'url(/eraser.svg) 0 0, auto';
        context.globalCompositeOperation = 'destination-out';
        context.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        canvasRef.current.style.cursor = 'url(/pencil.svg) 0 0, auto';
        context.globalCompositeOperation = 'source-over';
        context.strokeStyle = colorTheme === 'dark' ? 'white' : color;
      }
    }
  }, [activeMenuItem, colorTheme]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;
    context.lineWidth = size;


      // Set the pencil color based on the theme
     context.strokeStyle = colorTheme === 'light' ? 'white' : color;
    
      
    
      const handleChangeConfig = (config: { color: string; size: number }) => {
        changeConfig(config.color, config.size);
      };
    
  
  //  changeConfig(color, size);

    // If you are not using socket, you can remove the following lines:
    socket.on("changeConfig", handleChangeConfig);
    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size, colorTheme]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x: number, y: number) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      shouldDraw.current = true;
      beginPath(
        (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX,
        (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY
      );
      socket.emit("beginPath", {
        x: (e as MouseEvent).clientX,
        y: (e as MouseEvent).clientY,
      });
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!shouldDraw.current) return;
      drawLine(
        (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX,
        (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY
      );
      socket.emit("drawLine", {
        x: (e as MouseEvent).clientX,
        y: (e as MouseEvent).clientY,
      });
    };

    const handleMouseUp = () => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    const handleBeginPath = (path: { x: number; y: number }) => {
      beginPath(path.x, path.y);
    };

    const handleDrawLine = (path: { x: number; y: number }) => {
      drawLine(path.x, path.y);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);

    // If you are not using socket, you can remove the following lines:
    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawLine);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);

      // If you are not using socket, you can remove the following lines:
      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
    };
  }, []);

  return (
    <div className="h-screen w-screen p-10 dark:bg-gray-900 bg-indigo-200">
      <div className="flex justify-end items-start absolute top-0 right-0 p-4">
        {colorTheme === "light" ? (
          <FontAwesomeIcon
            icon={faSun}
            onClick={() => setTheme('light')}
            className="h-10 w-10 text-indigo-200 cursor-pointer"
          />
        ) : (
          <FontAwesomeIcon
            icon={faMoon}
            onClick={() => setTheme('dark')}
            className="h-10 w-10 text-gray-900 cursor-pointer"
          />
        )}
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
  
      };
    export default Home;

function changeConfig(color: string, size: number) {
  throw new Error("Function not implemented.");
}
