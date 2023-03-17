import X from "./Selections/X";
import Circle from "./Selections/Circle";

type ResultsProps = {
    winner: string | undefined,
    nextRound: () => void
}

export default function Results({ winner, nextRound }: ResultsProps) {
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