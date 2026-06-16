
// take a current position
// output valid positions
import { PieceName } from '../types/enums.ts';
import { getPieceAtSquare } from '../board.tsx';
import { coords, PieceData, } from '../types/types.ts'
import { log } from 'node:console';

type ValidRelatives = { [key in PieceName]: coords[] }

const validRelatives: ValidRelatives = {
  [PieceName.Knight]: [
    { row: 2, col: 1 },
    { row: 1, col: 2 },
    { row: -2, col: -1 },
    { row: -1, col: -2 },
    { row: 2, col: -1 },
    { row: 1, col: -2 },
    { row: -2, col: 1 },
    { row: -1, col: 2 }
  ],
  [PieceName.King]: [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 0, col: 1 },
    { row: -1, col: 1 },
    { row: -1, col: 0 },
    { row: -1, col: -1 },
    { row: 0, col: -1 },
    { row: 1, col: -1 }
  ],
  [PieceName.Bishop]: [],
  [PieceName.Pawn]: [
    { row: 1, col: 0 },
  ],
  [PieceName.Queen]: [],
  [PieceName.Rook]: []
}

function colorCorrectRelativeMove(coord: coords, isWhite: boolean | undefined): coords {
  console.log("isWhite: " + isWhite);

  if (isWhite || isWhite == undefined) return coord
  return { row: -1 * coord.row, col: coord.col }
}

export const Move = {
  getValidMoves(piece: PieceData, startingCoords: coords, boardState: PieceData[][]): coords[] {
    let validMoves: coords[] = []
    if (piece.isWhite == undefined) return []
    switch (piece.name) {
      case PieceName.Knight:

        validRelatives[piece.name].forEach(validRelative => validMoves.push(this.addToCoord(startingCoords, validRelative)));
        console.log("Considered moves: ")
        console.log(JSON.stringify(validMoves))
        validMoves = validMoves.filter(coord => !this.isOutsideOfBoard(coord))
        console.log("Valid moves: ")
        console.log(JSON.stringify(validMoves))
        break;

      case PieceName.King:
        break;

      case PieceName.Pawn:
        // add double move if on original rank
        // { row: 2, col: 0 },

        if ((piece.isWhite && startingCoords.row == 1) || (!piece.isWhite && startingCoords.row == 6)) {
          console.log("Pawn on starting rank")
          validMoves.push(this.addToCoord(startingCoords, colorCorrectRelativeMove({ row: 2, col: 0 }, piece.isWhite)))
        }

        const colorCorrectedValidRelative = validRelatives[piece.name].map(relative => {
          if (piece.isWhite != undefined) {
            console.log(colorCorrectRelativeMove(relative, piece.isWhite))
            return colorCorrectRelativeMove(relative, piece.isWhite)
          }
        });

        validRelatives[piece.name].forEach(validRelative => validMoves.push(this.addToCoord(startingCoords, colorCorrectRelativeMove(validRelative, piece.isWhite))));
        console.log("Considered moves: ")
        console.log(JSON.stringify(validMoves))
        validMoves = validMoves.filter(coord => !this.isOutsideOfBoard(coord))

        console.log("Reconsidered moves: ")
        console.log(JSON.stringify(validMoves))
        // filter out opposite color moves straight ahead 
        validMoves = validMoves.filter(move => {
          const pieceAfterMove = getPieceAtSquare(move, boardState)
          console.log("Piece after move:")
          console.log(pieceAfterMove)

          if (pieceAfterMove == undefined || pieceAfterMove.isWhite == undefined) return true
        })
        // add pawn capture
        // { row: 1, col: 1 },
        // { row: 1, col: -1 },
        console.log("Reconsidered moves: ")
        console.log(JSON.stringify(validMoves))
        const captureRelatives = [{ row: 1, col: 1 }, { row: 1, col: -1 }];

        console.log("Reconsidered moves: ")
        console.log(JSON.stringify(validMoves))
        captureRelatives.forEach(relative => {
          const colorCorrectedRelative = colorCorrectRelativeMove(relative, piece.isWhite)
          console.log("colorCorrectedRelative: " + JSON.stringify(colorCorrectedRelative))
          const endSquare = this.addToCoord(startingCoords, colorCorrectedRelative)
          console.log("end square capture:")
          console.log(endSquare)
          const pieceAtEndSquare = getPieceAtSquare(endSquare, boardState)
          if (pieceAtEndSquare == undefined || pieceAtEndSquare.isWhite == undefined) return;
          if (pieceAtEndSquare.isWhite != piece.isWhite ) validMoves.push(endSquare)
        })


        console.log("Valid moves: ")
        console.log(JSON.stringify(validMoves))
        break;


      case PieceName.Bishop || PieceName.Queen || PieceName.Rook:

        break;

      default:
        break;
    }

    // filter validMoves for:
    // not putting own king in check

    // filter validMoves for:
    // not caputring own piece
    validMoves = validMoves.filter(move => {
      const pieceAfterMove = getPieceAtSquare(move, boardState)
      if (pieceAfterMove == undefined) return true
      return piece.isWhite != pieceAfterMove.isWhite
    })

    return validMoves
  },

  addToCoord(coords: coords, moveCoord: coords): coords {
    return { col: coords.col + moveCoord.col, row: coords.row + moveCoord.row }
  },

  isOutsideOfBoard(coord: coords) {
    if (coord.row > 7 || coord.row < 0) return true
    if (coord.col > 7 || coord.col < 0) return true
    return false
  }
}


