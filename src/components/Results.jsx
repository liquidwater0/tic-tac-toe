import React from 'react';
import X from "./Selections/X";
import Circle from "./Selections/Circle";

export default function Results({ winner, nextRound }) {
    return (
        <>
            {
                winner !== undefined &&
                <div className='results'>
                    <div className="results-container">
                        <div className='results-text'>
                            { winner === "x" && <X/> }
                            { winner === "circle" && <Circle/> }
                            <span>{ winner === "draw" ? "Draw!" : "Wins!" }</span>
                        </div>
                        <button
                            className='btn'
                            onClick={nextRound}
                        >
                            Next Round
                        </button>
                    </div>
                </div>
            }
        </>
    );
}