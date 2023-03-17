import React, { useState, useContext, ReactNode } from 'react';

type ScoresContextType = {
    playerScore: number,
    computerScore: number,
    setScore: (player: string, score: number) => void
}

const ScoresContext = React.createContext<ScoresContextType>(null!);

export function useScores() {
    return useContext(ScoresContext);
}

export default function ScoresProvider({ children }: { children: ReactNode }) {
    const [playerScore, setPlayerScore] = useState<number>(0);
    const [computerScore, setComputerScore] = useState<number>(0);

    function setScore(player: string, score: number) {
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