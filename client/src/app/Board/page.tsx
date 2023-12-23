'use client'
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { MENU_ITEMS } from "../constants";
import { actionItemClick } from '../slice/menuSlice';

interface RootState {
  menu: {
    activeMenuItem: string;
    actionMenuItem: string;
  };
  toolbox: {
    [key: string]: {
      color: string;
      size: number;
    };
  };
}

interface Path {
  x: number;
  y: number;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef<number>(0);
  const shouldDraw = useRef<boolean>(false);

  const { activeMenuItem, actionMenuItem } = useSelector((state: RootState) => state.menu);
  const { color, size } = useSelector((state: RootState) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')!;

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement('a');
      anchor.href = URL;
      anchor.download = 'sketch.jpg';
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1;
      if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')!;

    const changeConfig = (newColor: string, newSize: number) => {
      context.strokeStyle = newColor;
      context.lineWidth = newSize;
    };

    const handleChangeConfig = (config: { color: string; size: number }) => {
      changeConfig(config.color, config.size);
    };

    changeConfig(color, size);

    // If you are not using socket, you can remove the following lines:
    // socket.on('changeConfig', handleChangeConfig);
    // return () => {
    //   socket.off('changeConfig', handleChangeConfig);
    // };
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')!;

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
      beginPath((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX, (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!shouldDraw.current) return;
      drawLine((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX, (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY);
    };

    const handleMouseUp = () => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', handleMouseUp);

    // If you are not using socket, you can remove the following lines:
    // socket.on('beginPath', handleBeginPath);
    // socket.on('drawLine', handleDrawLine);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);

      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);

      // If you are not using socket, you can remove the following lines:
      // socket.off('beginPath', handleBeginPath);
      // socket.off('drawLine', handleDrawLine);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Home;
