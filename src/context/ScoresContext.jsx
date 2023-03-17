import React, { useState, useContext } from 'react';

const ScoresContext = React.createContext();

export function useScores() {
    return useContext(ScoresContext);
}

export default function ScoresProvider({ children }) {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);

    function setScore(player, score) {
        if (player === "player") {
            setPlayerScore(score);
        } else if (player === "computer") {
            setComputerScore(score);
        }
    }

    return (
        <ScoresContext.Provider value={{ playerScore, computerScore, setScore }}>
            { children }
        </ScoresContext.Provider>
    );
}