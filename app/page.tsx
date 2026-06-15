import Image from "next/image";
import Board from "./board";

export default function Home() {
  return (
    <div className="max-h-1/2 pl-10 pr-10 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-gray-700">
        <Board />
    </div>
  );
}
