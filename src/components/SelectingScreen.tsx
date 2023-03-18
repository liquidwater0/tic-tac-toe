import { useGameState, ACTIONS } from "../context/GameStateContent";
import X from "./Selections/X";
import Circle from "./Selections/Circle";

export default function SelectingScreen() {
    const { setGameState } = useGameState();

    function handleSelectionPicked(selection: string) {
        setGameState({ type: ACTIONS.UPDATE_PLAYER_SELECTION, payload: selection });
        setGameState({ type: ACTIONS.UPDATE_COMPUTER_SELECTION, payload: selection === "x" ? "circle" : "x" });
        setGameState({ type: ACTIONS.UPDATE_TURN, payload: selection });
        setGameState({ type: ACTIONS.UPDATE_CHOOSING_SELECTION, payload: false });
    }

    return (
        <div className='selecting-screen'>
            <h1>Choose Your Selection</h1>
            <div>
                <button
                    onClick={() => handleSelectionPicked("x")}
                >
                    <X/>
                </button>
                <button
                    onClick={() => handleSelectionPicked("circle")}
                >
                    <Circle/>
                </button>
            </div>
        </div>
    );
}