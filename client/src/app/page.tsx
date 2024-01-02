"use client";
import Menu from "./Menu/page";
import Toolbox from "./Toolbox/page";
import Board from "./Board/page";

export default function Home() {
  return (
    <div>
      <Menu />
      <Toolbox />
      <Board />
    </div>
  );
}