import X from "./Selections/X";
import Circle from "./Selections/Circle";

type ScoreBoxProps = {
    heading: string,
    value: number,
    selection?: string | null
}

export default function ScoreBox({ heading, value, selection }: ScoreBoxProps) {
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