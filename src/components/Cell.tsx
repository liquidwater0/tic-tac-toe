import { useGameState } from "../context/GameStateContent";
import X from "./Selections/X";
import Circle from "./Selections/Circle";

type CellProps = {
    cell: number,
    selection: string | null,
    turn: string | null,
    onClick: (cellNumber: number) => void
}

export default function Cell({ cell, selection, turn, onClick }: CellProps) {
    const { gameState } = useGameState();
    const computerChoosing = turn === gameState.computerSelection;

    return (
        <div 
            className={`cell ${selection || computerChoosing  ? "no-hover" : ""}`}
            onClick={() => onClick(cell)}
        >
            { selection === "x" && <X/> }
            { selection === "circle" && <Circle/> }
        </div>
    );
}