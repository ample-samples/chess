import { ReactNode } from "react";

export default function Board() {
        type SquareProps = {
                name: string
                isWhite: boolean
        }

        function Square(props: SquareProps) {
                const bgColorMap = { bgWhite: "bg-white", bgBlack: "bg-black" }
                const fgColorMap = { fgWhite: "text-white", fgBlack: "text-black" }
                const bgColor = props.isWhite ? bgColorMap.bgWhite : bgColorMap.bgBlack
                const fgColor = !props.isWhite ? fgColorMap.fgWhite : fgColorMap.fgBlack
                return (
                        <div className={`h-10 w-10 text-xl flex items-center justify-center ${bgColor} ${fgColor}`}>{props.name}</div>
                )
        }

        const colLabels = "ABCDEFGH"
        const rowLabels = "87654321"

        function squareContents2(): SquareProps[][] {
                let isWhiteSquare = true
                const columns: SquareProps[][] = []
                for (let i = 0; i < colLabels.length; i++) {
                        const row: SquareProps[] = []
                        for (let j = 0; j < rowLabels.length; j++) {
                                row.push({
                                        name: colLabels[j] + rowLabels[i],
                                        isWhite: (j + i) % 2 == 0
                                })
                        }
                        columns.push(row)
                }
                return columns
        }

        const Squares = () => {
                return (
                        <div className="grid w-80 h-80 grid-rows-8 grid-cols-8 bg-zinc-50 font-sans dark:bg-black"> {
                                squareContents2().map(row => {
                                        return (
                                                row.map(squareProps => {
                                                        return <Square name={squareProps.name} isWhite={squareProps.isWhite} key={squareProps.name} />
                                                })
                                        );
                                })
                        } </div>
                )
        }

        return (
                <Squares />
        );
}
