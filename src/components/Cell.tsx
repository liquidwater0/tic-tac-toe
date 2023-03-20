import { useGameState } from "../context/GameStateContent";
import { TCell } from "../types";
import X from "./Selections/X";
import Circle from "./Selections/Circle";

type CellProps = {
    handleCellClick: (cellNumber: number) => void
} & TCell

export default function Cell({ cell, selection, handleCellClick }: CellProps) {
    const { gameState } = useGameState();
    const computerChoosing = gameState.turn === gameState.computerSelection;

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