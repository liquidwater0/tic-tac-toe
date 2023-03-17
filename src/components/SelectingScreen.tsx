import { Dispatch, SetStateAction } from 'react';
import { useGameState, ACTIONS } from "../context/GameStateContent";
import X from "./Selections/X";
import Circle from "./Selections/Circle";

type SelectingScreenProps = {
    setSelectScreenOpen: Dispatch<SetStateAction<boolean>>
}

export default function SelectingScreen({ setSelectScreenOpen }: SelectingScreenProps) {
    const { setGameState } = useGameState();

    function handleClick(selection: string) {
        setGameState({ type: ACTIONS.UPDATE_PLAYER_SELECTION, payload: selection });
        setGameState({ type: ACTIONS.UPDATE_COMPUTER_SELECTION, payload: selection === "x" ? "circle" : "x" });
        setGameState({ type: ACTIONS.UPDATE_TURN, payload: selection });
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