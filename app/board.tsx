'use client'
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { coords, PieceData, SquareProps } from './types/types.ts'
import { PieceName } from './types/enums.ts'
import { startingBoardState } from './data/startState.ts'
import { Move } from "./piece moves/moves.ts";

export function getPieceAtSquare(coord: coords, boardState: PieceData[][]): PieceData {
    const flatBoard = boardState.flat()
    const reversedRow = [7, 6, 5, 4, 3, 2, 1, 0]
    const flatStartCoord = 8 * reversedRow[coord.row] + coord.col
    const pieceToMove: PieceData = flatBoard[flatStartCoord]
    return pieceToMove
  }


export default function Board() {
  const [boardState, setBoardState] = useState(startingBoardState)
  const [lastClicked, setLastClicked] = useState("")

  const movePiece = (boardState: PieceData[][], setBoardState: Dispatch<SetStateAction<{}[][] | PieceData[][]>>, start: coords, end: coords) => {
    const flatBoard = boardState.flat()
    const reversedRow = [7, 6, 5, 4, 3, 2, 1, 0]
    const flatStartCoord = 8 * reversedRow[start.row] + start.col
    flatBoard[flatStartCoord] = {}

    const flatEndCoord = 8 * reversedRow[end.row] + end.col
    const pieceToMove = getPieceAtSquare(start, boardState)

    if (pieceToMove.name == undefined) return null
    flatBoard[flatEndCoord] = pieceToMove
    const newBoardState = [];
    while (flatBoard.length) newBoardState.push(flatBoard.splice(0, 8));
    setBoardState(newBoardState)
  }

  const pieceImageName = {
    [PieceName.Pawn]: "p",
    [PieceName.Bishop]: "b",
    [PieceName.King]: "k",
    [PieceName.Queen]: "q",
    [PieceName.Knight]: "n",
    [PieceName.Rook]: "r",
  }

  const handleLastClicked = async (squareName: string) => {
    console.log(squareName)
    if (lastClicked == "") {
      const coord = squareNameToCoord(squareName)
      const piece = getPieceAtSquare(coord, boardState)
      if (piece == null || piece.name == undefined) {
        // selected square doesn't have a piece in it
        setLastClicked("")
        console.log(`${squareName} doesn't have a piece in it`)
        return
      }
      setLastClicked(squareName)
      console.log("Set: " + squareName)
    } else {
      const startCoord = squareNameToCoord(lastClicked)
      const endCoord = squareNameToCoord(squareName)
      const piece = getPieceAtSquare(startCoord, boardState)
      if (piece.name == undefined) {
        // selected square doesn't have a piece in it
        setLastClicked("")
        console.log(`${squareName} doesn't have a piece in it`)
        return
      }
      const validMoves = Move.getValidMoves(piece, startCoord, boardState)

      if (validMoves.filter(validMove => equalCoords(validMove, endCoord)).length > 0) {
        console.log("Valid move")
        movePiece(boardState, setBoardState, startCoord, endCoord)
        console.log("Start: " + JSON.stringify(startCoord))
        console.log("End: " + JSON.stringify(endCoord))
        console.log("Moved to: " + squareName)
      } else {
        console.log(JSON.stringify(endCoord) + ": not valid move")
        console.log("Start: " + JSON.stringify(startCoord))
        console.log("End: " + JSON.stringify(endCoord))
      }

      setLastClicked("")
    }
  }

  function equalCoords(coord1: coords, coord2: coords): boolean {
    const rowEq = coord1.row == coord2.row
    const colEq = coord1.col == coord2.col
    return rowEq && colEq
    // return rowEq && colEq
  }

  function squareNameToCoord(squareName: string): coords {
    const colToNumber: { [key: string]: number } = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7 }
    const coord = { col: colToNumber[squareName.charAt(0)], row: parseInt(squareName.charAt(1)) - 1 }
    return coord
  }

  function coordsToSquareName(coord: coords): string {
    const numberToCol = ["A", "B", "C", "D", "E", "F", "G", "H"]
    const squareName = `${numberToCol[coord.col]}${coord.row}}`
    return squareName
  }


  function Piece(props: PieceData) {
    if (props.isWhite == undefined || props.name == undefined) return <></>
    const pieceImagePath = `/chess pieces/${props.isWhite ? "white" : "black"}/${pieceImageName[props.name]}.svg`
    const bp = "/chess pieces/black/p.svg"
    return (
      <img src={pieceImagePath} alt={bp} id={pieceImagePath} />
    )
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
    return (
      <>
        <div className={`grid max-h-200 max-w-200 grid-rows-8 grid-cols-8 bg-zinc-50 font-sans dark:bg-black`}> {
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
