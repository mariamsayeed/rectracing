"use client";
import Menu from "./Menu/page";
import Toolbox from "./Toolbox/page";
import Board from "./Board/page";
import RecButton from "./component/RecButton";
import CanvasBgColor from "./component/CanvasBgColor";


export default function Home() {
  return (
    <div>
      <Menu />
      <Toolbox />
      <RecButton/>  
      <CanvasBgColor/>
      <Board />
    </div>
  );
}