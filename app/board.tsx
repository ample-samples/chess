'use client'
import { Dispatch, ReactNode, SetStateAction, useState } from "react";



export default function Board() {
        type SquareProps = {
                name: string
                isLight: boolean
                piece: PieceData
        }

        type PieceData = {
                name?: PieceName
                isWhite?: boolean
        }

        enum PieceName {
                Bishop,
                King,
                Knight,
                Pawn,
                Queen,
                Rook
        }

        const startingBoardState: PieceData[][] = [
                [{ isWhite: false, name: PieceName.Rook }, { isWhite: false, name: PieceName.Knight }, { isWhite: false, name: PieceName.Bishop }, { isWhite: false, name: PieceName.Queen }, { isWhite: false, name: PieceName.King }, { isWhite: false, name: PieceName.Bishop }, { isWhite: false, name: PieceName.Knight }, { isWhite: false, name: PieceName.Rook }],
                [{ isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{ isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }],
                [{ isWhite: true, name: PieceName.Rook }, { isWhite: true, name: PieceName.Knight }, { isWhite: true, name: PieceName.Bishop }, { isWhite: true, name: PieceName.King }, { isWhite: true, name: PieceName.Queen }, { isWhite: true, name: PieceName.Bishop }, { isWhite: true, name: PieceName.Knight }, { isWhite: true, name: PieceName.Rook }],
        ]

        type coords = {
                row: string
                col: string
        }

        const movePiece = (boardState: PieceData[][], setBoardState: Dispatch<SetStateAction<{}[][] | PieceData[][]>>, start: coords, end: coords) => {
                const flatBoard = boardState.flat()
                const reversedRow = [7, 6, 5, 4, 3, 2, 1, 0]
                const flatStartCoord = 8 * reversedRow[parseInt(start.row)] + (parseInt(start.col))
                const pieceToMove: PieceData = flatBoard[flatStartCoord]
                if (pieceToMove.name == undefined) return
                const flatEndCoord = 8 * reversedRow[parseInt(end.row)] + (parseInt(end.col))


                flatBoard[flatStartCoord] = {}
                flatBoard[flatEndCoord] = pieceToMove

                const newBoardState = [];
                while (flatBoard.length) newBoardState.push(flatBoard.splice(0, 8));

                setBoardState(newBoardState)
        }

        const [boardState, setBoardState] = useState(startingBoardState)



        const pieceImageName = {
                [PieceName.Pawn]: "p",
                [PieceName.Bishop]: "b",
                [PieceName.King]: "k",
                [PieceName.Queen]: "q",
                [PieceName.Knight]: "n",
                [PieceName.Rook]: "r",
        }

        function Piece(props: PieceData) {
                if (props.isWhite == undefined || props.name == undefined) return <></>
                const pieceImagePath = `/chess pieces/${props.isWhite ? "white" : "black"}/${pieceImageName[props.name]}.svg`
                const bp = "/chess pieces/black/p.svg"
                return (
                        <img src={pieceImagePath} alt={bp} id={pieceImagePath} />
                )
        }
        const [lastClicked, setLastClicked] = useState("")
        const handleLastClicked = async (squareName: string) => {
                console.log(squareName)
                if (lastClicked == "") {
                        setLastClicked(squareName)
                        console.log("Set: " + squareName)
                } else {
                        const colToNumber = { "A": "0", "B": "1", "C": "2", "D": "3", "E": "4", "F": "5", "G": "6", "H": "7" }
                        const endCoord = { col: colToNumber[squareName.charAt(0)], row: squareName.charAt(1) - 1 }
                        const startCoord = { col: colToNumber[lastClicked.charAt(0)], row: lastClicked.charAt(1) - 1 }
                        movePiece(boardState, setBoardState, startCoord, endCoord)
                        console.log("Start: " + JSON.stringify(startCoord))
                        console.log("End: " + JSON.stringify(endCoord))
                        console.log("Moved to: " + squareName)
                        setLastClicked("")
                }
        }


        function Square(props: SquareProps) {
                const bgColorMap = { bgWhite: "bg-gray-300", bgBlack: "bg-gray-700" }
                const fgColorMap = { fgWhite: "text-white", fgBlack: "text-black" }
                const bgColor = props.isLight ? bgColorMap.bgWhite : bgColorMap.bgBlack
                const fgColor = !props.isLight ? fgColorMap.fgWhite : fgColorMap.fgBlack
                const pieceImagePath = `/chess pieces/${props}`
                return (
                        <div onClick={() => handleLastClicked(props.name)} className={`cursor-pointer text-xl flex items-center justify-center ${bgColor} ${fgColor}`}>
                                {props.piece.name == null
                                        ? <Piece name={undefined} isWhite={undefined} />
                                        :
                                        <Piece name={props.piece.name} isWhite={props.piece.isWhite} />
                                }
                        </div>
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
                                const piece: PieceData | {} = boardState[i][j]
                                row.push({
                                        name: colLabels[j] + rowLabels[i],
                                        isLight: (j + i) % 2 == 0,
                                        piece: boardState[i][j]
                                })
                        }
                        columns.push(row)
                }
                return columns
        }

        const Squares = () => {
                const size = "80"
                return (
                        <>
                                <div className={`grid w-${size} h-${size} grid-rows-8 grid-cols-8 bg-zinc-50 font-sans dark:bg-black`}> {
                                        squareContents2().map(row => {
                                                return (
                                                        row.map(squareProps => {
                                                                return <Square name={squareProps.name} isLight={squareProps.isLight} piece={squareProps.piece} key={squareProps.name} />
                                                        })
                                                );
                                        })
                                } </div>
                        </>
                )
        }

        return (
                <Squares />
        );
}
