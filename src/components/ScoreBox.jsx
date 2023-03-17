import React from 'react';
import X from "./Selections/X";
import Circle from "./Selections/Circle";

export default function ScoreBox({ heading, value, selection }) {
    return (
        <div className={`outlined-box ${selection ? `${selection}-color` : ""}`}>
            { selection === "x" && <X/> }
            { selection === "circle" && <Circle/> }
            <div>
                <div className='heading-text'>{ heading }</div>
                <div className='text'>{ value }</div>
            </div>
        </div>
    );
}