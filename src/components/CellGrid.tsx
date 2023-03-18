import { useCells } from "../context/CellsContext";
import { useGameState } from "../context/GameStateContent";
import Cell from './Cell';
import ScoreBox from './ScoreBox';
import X from "./Selections/X";
import Circle from "./Selections/Circle";

export default function CellGrid() {
    const { cells } = useCells();
    const { gameState } = useGameState();
    
    return (
        <div className="cell-grid">
            <ScoreBox
                heading="You"
                value={gameState.playerScore}
                selection={gameState.playerSelection}
            />
            <ScoreBox
                heading="Round"
                value={gameState.round}
            />
            <ScoreBox
                heading="Computer"
                value={gameState.computerScore}
                selection={gameState.computerSelection}
            />
            {
                cells.map(({ cell, selection }) => {
                    return (
                        <Cell 
                            key={cell} 
                            cell={cell}
                            selection={selection} 
                            turn={gameState.turn}
                        />
                    );
                })
            }
            <div className={`outlined-box turn-box ${gameState.turn}-color`}>
                { gameState.turn === "x" && <X/> }
                { gameState.turn === "circle" && <Circle/> }
                <span className='text'>Playing</span>
            </div>
        </div>
    );
}