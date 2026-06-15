
// take a current position
// output valid positions
import { PieceName } from '../types/enums.ts';
import { coords, PieceData, } from '../types/types.ts'



export const Move = {
	getValidMoves(piece: PieceName, startingCoords: coords, boardState: PieceData[][]): coords[] {
		const validCoords: coords[] = []
		switch (piece) {
			case PieceName.Knight:
				const consideredMoves: coords[] = [];
				consideredMoves.push(this.addToCoord(startingCoords, 2, 1))
				consideredMoves.push(this.addToCoord(startingCoords, 1, 2))
				consideredMoves.push(this.addToCoord(startingCoords, -2, -1))
				consideredMoves.push(this.addToCoord(startingCoords, -1, -2))
				consideredMoves.push(this.addToCoord(startingCoords, 2, -1))
				consideredMoves.push(this.addToCoord(startingCoords, 1, -2))
				consideredMoves.push(this.addToCoord(startingCoords, -2, 1))
				consideredMoves.push(this.addToCoord(startingCoords, -1, 2))
				console.log("Considered moves: ")
				console.log(JSON.stringify(consideredMoves))
				const validMoves = consideredMoves.filter(coord => !this.isOutsideOfBoard(coord))
				console.log("Valid moves: ")
				console.log(JSON.stringify(validMoves))
				
				return validMoves

				break;

			default:
				break;
		}
		// should have 8 moves

		return validCoords
	},

	addToCoord(coords: coords, addRow: number, addColumn: number): coords {
		return {col: coords.col + addColumn, row: coords.row + addRow}
	},

	isOutsideOfBoard(coord: coords) {
		if (coord.row > 7 || coord.row < 0) return true
		if (coord.col > 7 || coord.col < 0) return true
		return false
	}
}
