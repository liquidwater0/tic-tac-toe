import React, { useState, useEffect } from 'react';
import "./scss/App.scss";
import { useCells } from "./context/CellsContext";
import { useSelections } from './context/SelectionsContext';
import { useScores } from "./context/ScoresContext";
import Header from "./components/Header";
import CellGrid from "./components/CellGrid";
import Footer from "./components/Footer";
import SelectingScreen from './components/SelectingScreen';
import SettingsMenu from './components/Menus/SettingsMenu';
import Results from './components/Results';

/*
    TODO:
    Fix empty cells not filtering out selected cells.
    Fix buggy winner states.
    Fix lag.
    Fix computer still choosing after changing selections or resetting.
    Make settings menu.
    Make color scheme and theme changer.
    Make light mode styles.
    Make computer choose cycle animation?
*/

const COMPUTER_DELAY = 3000;
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
    const { cells, emptyCells, selectCell, clearCells } = useCells();
    const { playerSelection, computerSelection, setSelection } = useSelections();
    const { playerScore, computerScore, setScore } = useScores();
    const [round, setRound] = useState(0);
    const [winner, setWinner] = useState(undefined);
    const [turn, setTurn] = useState(playerSelection);
    const [selectScreenOpen, setSelectScreenOpen] = useState(true);
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

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
            setWinner("x");
            if (playerSelection === "x") setScore("player", playerScore + 1);
            if (computerSelection === "x") setScore("computer", computerScore + 1);
        }
        if (circleWin) {
            setWinner("circle");
            if (playerSelection === "circle") setScore("player", playerScore + 1);
            if (computerSelection === "circle") setScore("computer", computerScore + 1);
        }
        if (emptyCells.length < 1 && !xWin && !circleWin) {
            setWinner("draw");
        }
    }

    function handleCellClick(cellNumber) {
        const selectedCell = cells.find(cell => cell.cell === cellNumber);
        const cell = selectedCell.cell;

        if (emptyCells.length < 1) return;
        if (selectedCell.selection !== null) return;
        if (turn === computerSelection) return;

        selectCell(cell, playerSelection);
        getComputerSelection();
    }

    function getComputerSelection() {
        setTurn(computerSelection);

        setTimeout(() => {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const cellNumber = randomCell.cell;
            
            selectCell(cellNumber, computerSelection);
            setTurn(playerSelection);
        }, COMPUTER_DELAY);
    }

    function nextRound() {
        setRound(prev => prev + 1);
        setWinner(undefined);
        clearCells();
    }

    function changeSelection() {
        setSelectScreenOpen(true);
        setSelection("player", "")
        setSelection("computer", "")
        clearCells();
    }

    function reset() {
        changeSelection();
        setScore("player", 0);
        setScore("computer", 0);
        setRound(0);
        setWinner(undefined);
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
                    <SelectingScreen 
                        setTurn={setTurn}
                        setSelectScreenOpen={setSelectScreenOpen}
                    /> :
                    <CellGrid 
                        handleCellClick={handleCellClick} 
                        turn={turn}
                        round={round}
                    />
                }
            </main>
            <Footer 
                selectScreenOpen={selectScreenOpen}
                changeSelection={changeSelection}
                reset={reset}
                openSettings={openSettings}
            />
            <Results
                winner={winner}
                nextRound={nextRound}
            />
            <SettingsMenu
                title="Settings"
                value={settingsMenuOpen}
                setValue={setSettingsMenuOpen}
            />
        </>
    );
}