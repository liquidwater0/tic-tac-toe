import React, { useState, useContext, ReactNode } from 'react';
import { TCell } from '../types';

type CellsContextType = {
    cells: TCell[],
    emptyCells: TCell[],
    selectCell: (cellNumber: number, selection: string) => void,
    clearCells: () => void
}

const CellsContext = React.createContext<CellsContextType>(null!);

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

export default function CellsProvider({ children }: { children: ReactNode }) {
    const [cells, setCells] = useState<TCell[]>(initialCells);
    const [emptyCells, setEmptyCells] = useState<TCell[]>(initialCells);

    function selectCell(cellNumber: number, selection: string) {
        setCells(prev => {
            const cellsCopy = [...prev];
            const cell = cellsCopy.find(({ cell }) => cell === cellNumber);

            if (cell) cell.selection = selection;
            
            return cellsCopy;
        });

        setEmptyCells(prev => {
            const cellsCopy = [...prev];
            return cellsCopy.filter(cell => cell.selection === null);
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