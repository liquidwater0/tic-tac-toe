import { Dispatch, SetStateAction } from 'react';
import { useSelections } from '../context/SelectionsContext';
import X from "./Selections/X";
import Circle from "./Selections/Circle";

type SelectingScreenProps = {
    setTurn: Dispatch<SetStateAction<string>>,
    setSelectScreenOpen: Dispatch<SetStateAction<boolean>>
}

export default function SelectingScreen({ setTurn, setSelectScreenOpen }: SelectingScreenProps) {
    const { setSelection } = useSelections();

    function handleClick(selection: string) {
        setSelection("player", selection);
        setSelection("computer", selection === "x" ? "circle" : "x");
        setTurn(selection);
        setSelectScreenOpen(false);
    }

    return (
        <div className='selecting-screen'>
            <h1>Choose Your Selection</h1>
            <div>
                <button
                    onClick={() => handleClick("x")}
                >
                    <X/>
                </button>
                <button
                    onClick={() => handleClick("circle")}
                >
                    <Circle/>
                </button>
            </div>
        </div>
    );
}