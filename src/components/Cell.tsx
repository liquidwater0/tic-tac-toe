import { useSelections } from '../context/SelectionsContext';
import X from "./Selections/X";
import Circle from "./Selections/Circle";

type CellProps = {
    cell: number,
    selection: string | null,
    turn: string,
    onClick: (cellNumber: number) => void
}

export default function Cell({ cell, selection, turn, onClick }: CellProps) {
    const { computerSelection } = useSelections();
    const computerChoosing = turn === computerSelection;

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