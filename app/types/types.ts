import { PieceName } from './enums.ts'

export type coords = {
        row: number
        col: number
}
export type SquareProps = {
        name: string
        isLight: boolean
        piece: PieceData
}

export type PieceData = {
        name?: PieceName
        isWhite?: boolean
}

