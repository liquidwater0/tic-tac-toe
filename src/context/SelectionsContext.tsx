import React, { useState, useContext, ReactNode } from 'react';

type SelectionsContextType = {
    playerSelection: string,
    computerSelection: string,
    setSelection: (player: string, selection: string) => void
}

const SelectionsContext = React.createContext<SelectionsContextType>(null!);

export function useSelections() {
    return useContext(SelectionsContext);
}

export default function SelectionsProvider({ children }: { children: ReactNode }) {
    const [playerSelection, setPlayerSelection] = useState<string>("");
    const [computerSelection, setComputerSelection] = useState<string>("");

    function setSelection(player: string, selection: string) {
        if (player === "player") {
            setPlayerSelection(selection);
        } else if (player === "computer") {
            setComputerSelection(selection);
        }
    }

    return (
        <SelectionsContext.Provider value={{ playerSelection, computerSelection, setSelection }}>
            { children }
        </SelectionsContext.Provider>
    );
}