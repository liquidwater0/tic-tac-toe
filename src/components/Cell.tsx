import { COMPUTER_DELAY } from "../App";
import { useGameState, ACTIONS } from "../context/GameStateContent";
import { useCells } from "../context/CellsContext";
import X from "./Selections/X";
import Circle from "./Selections/Circle";

type CellProps = {
    cell: number,
    selection: string | null
}

export default function Cell({ cell, selection }: CellProps) {
    const { gameState, setGameState } = useGameState();
    const { cells, emptyCells, selectCell } = useCells();
    const computerChoosing = gameState.turn === gameState.computerSelection;

    function handleCellClick(cellNumber: number) {
        const selectedCell = cells.find(({ cell }) => cell === cellNumber);
        const cell = selectedCell?.cell;
    
        if (emptyCells.length < 1) return;
        if (selectedCell?.selection !== null) return;
        if (gameState.turn === gameState.computerSelection) return;
        if (!cell || !gameState.playerSelection) return;
    
        selectCell(cell, gameState.playerSelection);
        getComputerSelection();
    }

    function getComputerSelection() {
        setGameState({ type: ACTIONS.UPDATE_TURN, payload: gameState.computerSelection });

        setTimeout(() => {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const cellNumber = randomCell.cell;

            if (!gameState.computerSelection) return;
            
            selectCell(cellNumber, gameState.computerSelection);
            setGameState({ type: ACTIONS.UPDATE_TURN, payload: gameState.playerSelection });
        }, COMPUTER_DELAY);
    }

    return (
        <div 
            className={`cell ${selection || computerChoosing  ? "no-hover" : ""}`}
            onClick={() => handleCellClick(cell)}
        >
            { selection === "x" && <X/> }
            { selection === "circle" && <Circle/> }
        </div>
    );
}