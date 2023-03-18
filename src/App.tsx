import { useState, useEffect } from 'react';
import "./scss/App.scss";
import { useCells } from "./context/CellsContext";
import { useGameState, ACTIONS } from "./context/GameStateContent";
import Header from "./components/Header";
import CellGrid from "./components/CellGrid";
import Footer from "./components/Footer";
import SelectingScreen from './components/SelectingScreen';
import SettingsMenu from './components/Menus/SettingsMenu';
import Results from './components/Results';

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
    const { cells, emptyCells, clearCells } = useCells();
    const { gameState, setGameState } = useGameState();
    const [selectScreenOpen, setSelectScreenOpen] = useState<boolean>(true);
    const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false);

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

    function nextRound() {
        setGameState({ type: ACTIONS.INCREMENT_ROUND_NUMBER });
        setGameState({ type: ACTIONS.UPDATE_WINNER, payload: null });
        clearCells();
    }

    function changeSelection() {
        setSelectScreenOpen(true);
        setGameState({ type: ACTIONS.UPDATE_PLAYER_SELECTION, payload: null });
        setGameState({ type: ACTIONS.UPDATE_COMPUTER_SELECTION, payload: null });
        clearCells();
    }

    function reset() {
        changeSelection();
        setGameState({ type: ACTIONS.RESET });
    }

    function openSettings() {
        setSettingsMenuOpen(true);
    }

    return (
        <>
            <Header/>

            <main className='main'>
                {
                    selectScreenOpen ?
                    <SelectingScreen setSelectScreenOpen={setSelectScreenOpen}/> :
                    <CellGrid/>
                }
            </main>

            <Footer 
                selectScreenOpen={selectScreenOpen}
                changeSelection={changeSelection}
                reset={reset}
                openSettings={openSettings}
            />

            <Results nextRound={nextRound}/>
            
            <SettingsMenu
                title="Settings"
                value={settingsMenuOpen}
                setValue={setSettingsMenuOpen}
            />
        </>
    );
}