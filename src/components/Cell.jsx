import React from 'react';
import { useSelections } from '../context/SelectionsContext';
import X from "./Selections/X";
import Circle from "./Selections/Circle";

export default function Cell({ cellNumber, selection, turn, onClick }) {
    const { computerSelection } = useSelections();
    const computerChoosing = turn === computerSelection;

    return (
        <div 
            className={`cell ${selection || computerChoosing  ? "no-hover" : ""}`}
            onClick={() => onClick(cellNumber)}
        >
            { selection === "x" && <X/> }
            { selection === "circle" && <Circle/> }
        </div>
    );
}