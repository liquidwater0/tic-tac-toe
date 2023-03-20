import { useEffect } from 'react';
import "./scss/App.scss";
import { useCells } from "./context/CellsContext";
import { useGameState, ACTIONS } from "./context/GameStateContent";
import { useMenus } from './context/MenuContext';
import X from './components/Selections/X';
import Circle from './components/Selections/Circle';
import Button from './components/Button';
import Cell from './components/Cell';
import ScoreBox from './components/ScoreBox';
import SelectingScreen from './components/SelectingScreen';
import SettingsMenu from './components/Menus/SettingsMenu';

export const COMPUTER_DELAY = 3000;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export default function App() {
    const { gameState, setGameState } = useGameState();
    const { cells, emptyCells, selectCell, clearCells } = useCells();
    const { openMenu } = useMenus();

    useEffect(() => {
        checkWin();
    }, [cells]);

    function checkWin() {
        const xWin = WINNING_COMBINATIONS.some(array => {
            return array.every(index => cells[index].selection === "x");
        });

        const circleWin = WINNING_COMBINATIONS.some(array => {
            return array.every(index => cells[index].selection === "circle");
        });

        if (xWin) {
            setGameState({ type: ACTIONS.UPDATE_WINNER, payload: "x" });
            if (gameState.playerSelection === "x") setGameState({ type: ACTIONS.INCREMENT_PLAYER_SCORE });
            if (gameState.computerSelection === "x") setGameState({ type: ACTIONS.INCREMENT_COMPUTER_SCORE });;
        }

        if (circleWin) {
            setGameState({ type: ACTIONS.UPDATE_WINNER, payload: "circle" });
            if (gameState.playerSelection === "circle") setGameState({ type: ACTIONS.INCREMENT_PLAYER_SCORE });
            if (gameState.computerSelection === "circle") setGameState({ type: ACTIONS.INCREMENT_COMPUTER_SCORE });
        }

        if (emptyCells.length < 1 && !xWin && !circleWin) {
            setGameState({ type: ACTIONS.UPDATE_WINNER, payload: "draw" });
        }
    }

    function handleCellClick(cellNumber: number) {
        const selectedCell = cells.find(({ cell }) => cell === cellNumber);
        const cell = selectedCell?.cell;
    
        if (emptyCells.length < 1) return;
        if (selectedCell?.selection !== null) return;
        if (gameState.turn === gameState.computerSelection) return;
        if (!cell || !gameState.playerSelection) return;
    
        selectCell(cell, gameState.playerSelection);
        getComputerSelection();
    }

    function getComputerSelection() {
        setGameState({ type: ACTIONS.UPDATE_TURN, payload: gameState.computerSelection });

        setTimeout(() => {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const cellNumber = randomCell.cell;

            if (!gameState.computerSelection) return;
            
            selectCell(cellNumber, gameState.computerSelection);
            setGameState({ type: ACTIONS.UPDATE_TURN, payload: gameState.playerSelection });
        }, COMPUTER_DELAY);
    }

    function nextRound() {
        setGameState({ type: ACTIONS.INCREMENT_ROUND_NUMBER });
        setGameState({ type: ACTIONS.UPDATE_WINNER, payload: null });
        clearCells();
    }

    function changeSelection() {
        setGameState({ type: ACTIONS.UPDATE_CHOOSING_SELECTION, payload: true });
        setGameState({ type: ACTIONS.UPDATE_PLAYER_SELECTION, payload: null });
        setGameState({ type: ACTIONS.UPDATE_COMPUTER_SELECTION, payload: null });
        clearCells();
    }

    function reset() {
        changeSelection();
        setGameState({ type: ACTIONS.RESET });
    }

    return (
        <>
            <header className='header'>
                <div className='title'>
                    <span>Tic Tac T</span>
                    <Circle/>
                    <span>e</span>
                </div>
            </header>

            <main className='main'>
                {
                    gameState.choosingSelection ?
                    <SelectingScreen/> :
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
                                        handleCellClick={handleCellClick}
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
                }
            </main>

            <footer className='footer'>
                <div>
                    <Button 
                        buttonStyle="outlined" 
                        className='btn-danger'
                        onClick={reset}
                    >
                        Reset
                    </Button>
                    {
                        !gameState.choosingSelection &&
                        <Button 
                            buttonStyle="outlined" 
                            onClick={changeSelection}
                        >
                            Change Selection
                        </Button>
                    }
                </div>
                <div>
                    <Button 
                        buttonStyle="outlined" 
                        onClick={() => openMenu("settingsMenu")}
                    >
                        Settings
                    </Button>
                </div>
            </footer>

            {
                gameState.winner !== null &&
                <div className='results'>
                    <div className="results-container">
                        <div className='results-text'>
                            { gameState.winner === "x" && <X/> }
                            { gameState.winner === "circle" && <Circle/> }
                            <span>{ gameState.winner === "draw" ? "Draw!" : "Wins!" }</span>
                        </div>
                        <Button onClick={nextRound}>
                            Next Round
                        </Button>
                    </div>
                </div>
            }

            <SettingsMenu/>
        </>
    );
}