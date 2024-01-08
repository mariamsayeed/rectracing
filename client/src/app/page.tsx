"use client";
import Menu from "./Menu/page";
import Toolbox from "./Toolbox/page";
import Board from "./Board/page";
import RecButton from "./RecButton";
import CanvasBgColor from "./CanvasBgColor";
import Shapes from "./Shapes";



export default function Home() {
  return (
    <div>
      <Menu />
      <Toolbox />
      <RecButton/>  
      <CanvasBgColor/>
      <Shapes />
      <Board />
    </div>
  );
}