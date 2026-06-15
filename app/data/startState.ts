import { PieceData } from '../types/types.ts'
import { PieceName } from '../types/enums.ts'

export const startingBoardState: PieceData[][] = [
	[{ isWhite: false, name: PieceName.Rook }, { isWhite: false, name: PieceName.Knight }, { isWhite: false, name: PieceName.Bishop }, { isWhite: false, name: PieceName.Queen }, { isWhite: false, name: PieceName.King }, { isWhite: false, name: PieceName.Bishop }, { isWhite: false, name: PieceName.Knight }, { isWhite: false, name: PieceName.Rook }],
	[{ isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }, { isWhite: false, name: PieceName.Pawn }],
	[{}, {}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}, {}],
	[{}, {}, {}, {}, {}, {}, {}, {}],
	[{ isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }, { isWhite: true, name: PieceName.Pawn }],
	[{ isWhite: true, name: PieceName.Rook }, { isWhite: true, name: PieceName.Knight }, { isWhite: true, name: PieceName.Bishop }, { isWhite: true, name: PieceName.King }, { isWhite: true, name: PieceName.Queen }, { isWhite: true, name: PieceName.Bishop }, { isWhite: true, name: PieceName.Knight }, { isWhite: true, name: PieceName.Rook }],
]

