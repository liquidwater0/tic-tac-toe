import React, { useState, useContext, useEffect } from 'react';

const CellsContext = React.createContext();

export function useCells() {
    return useContext(CellsContext);
}

const initialCells = [
    { cell: 1, selection: null },
    { cell: 2, selection: null },
    { cell: 3, selection: null },
    { cell: 4, selection: null },
    { cell: 5, selection: null },
    { cell: 6, selection: null },
    { cell: 7, selection: null },
    { cell: 8, selection: null },
    { cell: 9, selection: null }
];

export default function CellsProvider({ children }) {
    const [cells, setCells] = useState(initialCells);
    const [emptyCells, setEmptyCells] = useState(initialCells);

    useEffect(() => {
        setEmptyCells(() => {
            const cellsCopy = [...cells];
            return cellsCopy.filter(cell => cell.selection === null);
        });
        // console.log(emptyCells);
    }, [cells]);

    function selectCell(cellNumber, selection) {
        setCells(prev => {
            const cellsCopy = [...prev];
            const cell = cellsCopy.find(({ cell }) => cell === cellNumber);
            cell.selection = selection;
            return cellsCopy;
        });
    }

    function clearCells() {
        setCells(prev => {
            const cellsCopy = [...prev];
            cellsCopy.forEach(cell => cell.selection = null);
            return cellsCopy;
        });
    }

    return (
        <CellsContext.Provider value={{ cells, emptyCells, selectCell, clearCells }}>
            { children }
        </CellsContext.Provider>
    );
}