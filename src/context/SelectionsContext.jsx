import React, { useState, useContext } from 'react';

const SelectionsContext = React.createContext();

export function useSelections() {
    return useContext(SelectionsContext);
}

export default function SelectionsProvider({ children }) {
    const [playerSelection, setPlayerSelection] = useState("");
    const [computerSelection, setComputerSelection] = useState("");

    function setSelection(player, selection) {
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