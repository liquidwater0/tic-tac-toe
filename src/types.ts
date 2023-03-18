export type TCell = {
    cell: number,
    selection: string | null
}

export type TMenu = {
    title: string,
    menuId: string
}

export type TGameState = {
    playerSelection: null | string,
    computerSelection: null | string,
    playerScore: number,
    computerScore: number,
    round: number,
    winner: null | string,
    turn: null | string,
    choosingSelection: boolean
}