import Image from "next/image";
import Board from "./board";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-gray-700">
    <Board/>
    </div>
  );
}
