import React from 'react';
import { useCells } from "../context/CellsContext";
import { useSelections } from '../context/SelectionsContext';
import { useScores } from '../context/ScoresContext';
import Cell from './Cell';
import ScoreBox from './ScoreBox';
import X from "./Selections/X";
import Circle from "./Selections/Circle";

export default function CellGrid(props) {
    const {
        handleCellClick,
        turn,
        round
    } = props;

    const { cells } = useCells();
    const { playerSelection, computerSelection } = useSelections();
    const { playerScore, computerScore } = useScores();
    
    return (
        <div className="cell-grid">
            <ScoreBox
                heading="You"
                value={playerScore}
                selection={playerSelection}
            />
            <ScoreBox
                heading="Round"
                value={round}
            />
            <ScoreBox
                heading="Computer"
                value={computerScore}
                selection={computerSelection}
            />
            {
                cells.map(({ cell, selection }) => {
                    return (
                        <Cell 
                            key={cell} 
                            cellNumber={cell}
                            selection={selection} 
                            turn={turn}
                            onClick={handleCellClick}
                        />
                    );
                })
            }
            <div className={`outlined-box turn-box ${turn}-color`}>
                { turn === "x" && <X/> }
                { turn === "circle" && <Circle/> }
                <span className='text'>Playing</span>
            </div>
        </div>
    );
}