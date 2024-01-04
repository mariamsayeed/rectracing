"use client";
import Menu from "./Menu/page";
import Toolbox from "./Toolbox/page";
import Board from "./Board/page";
import RecButton from "./RecButton";
import CanvasBgColor from "./CanvasBgColor";
import Camera from "./Camera";


export default function Home() {
  return (
    <div>
      <Menu />
      <Toolbox />
      <RecButton/>  
      <CanvasBgColor/>
      <Camera/>
      <Board />
    </div>
  );
}