import { useGameState } from "../context/GameStateContent";
import X from "./Selections/X";
import Circle from "./Selections/Circle";

type ResultsProps = {
    nextRound: () => void
}

export default function Results({ nextRound }: ResultsProps) {
    const { gameState } = useGameState();

    return (
        <>
            {
                gameState.winner !== undefined &&
                <div className='results'>
                    <div className="results-container">
                        <div className='results-text'>
                            { gameState.winner === "x" && <X/> }
                            { gameState.winner === "circle" && <Circle/> }
                            <span>{ gameState.winner === "draw" ? "Draw!" : "Wins!" }</span>
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