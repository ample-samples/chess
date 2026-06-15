
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
				const validRelatives = [
					{ row: 2, col: 1 },
					{ row: 1, col: 2 },
					{ row: -2, col: -1 },
					{ row: -1, col: -2 },
					{ row: 2, col: -1 },
					{ row: 1, col: -2 },
					{ row: -2, col: 1 },
					{ row: -1, col: 2 }
				]

        validRelatives.forEach(validRelative => consideredMoves.push(this.addToCoord(startingCoords, validRelative)));
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

	addToCoord(coords: coords, moveCoord: coords): coords {
		return { col: coords.col + moveCoord.col, row: coords.row + moveCoord.row }
	},

	isOutsideOfBoard(coord: coords) {
		if (coord.row > 7 || coord.row < 0) return true
		if (coord.col > 7 || coord.col < 0) return true
		return false
	}
}
