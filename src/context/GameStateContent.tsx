import React, { useReducer, useContext, ReactNode, Reducer, Dispatch } from 'react';
import { TGameState } from '../types';

type TGameStateAction = { type: string, payload?: any }
type TGameStateReducer = Reducer<TGameState, TGameStateAction>
type GameStateContextType = {
    gameState: TGameState,
    setGameState: Dispatch<TGameStateAction>
}

const GameStateContext = React.createContext<GameStateContextType>(null!);

export function useGameState() {
    return useContext(GameStateContext);
}

export const ACTIONS = {
    UPDATE_PLAYER_SELECTION: "updatePlayerSelection",
    UPDATE_COMPUTER_SELECTION: "updateComputerSelection",
    INCREMENT_PLAYER_SCORE: "incrementPlayerScore",
    INCREMENT_COMPUTER_SCORE: "incrementComputerScore",
    INCREMENT_ROUND_NUMBER: "incrementRoundNumber",
    UPDATE_WINNER: "updateWinner",
    UPDATE_TURN: "updateTurn",
    RESET: "reset"
}

const initialGameState = {
    playerSelection: null,
    computerSelection: null,
    playerScore: 0,
    computerScore: 0,
    round: 0,
    winner: null,
    turn: null
}

function gameStateReducer(
    state: TGameState, 
    action: TGameStateAction
) {
    switch(action.type) {
        case ACTIONS.UPDATE_PLAYER_SELECTION:
            return { ...state, playerSelection: action.payload}
        case ACTIONS.UPDATE_COMPUTER_SELECTION:
            return { ...state, computerSelection: action.payload}
        case ACTIONS.INCREMENT_PLAYER_SCORE:
            return { ...state, playerScore: state.playerScore + 1}
        case ACTIONS.INCREMENT_COMPUTER_SCORE:
            return { ...state, computerScore: state.computerScore + 1}
        case ACTIONS.INCREMENT_ROUND_NUMBER:
            return { ...state, round: state.round + 1}
        case ACTIONS.UPDATE_WINNER:
            return { ...state, winner: action.payload}
        case ACTIONS.UPDATE_TURN:
            return { ...state, winner: action.payload}
        case ACTIONS.RESET:
            return initialGameState;
        default:
            return state;
    }
}

export default function GameStateProvider({ children }: { children: ReactNode }) {
    const [gameState, setGameState] = useReducer<TGameStateReducer>(gameStateReducer, initialGameState);

    return (
        <GameStateContext.Provider value={{ gameState, setGameState }}>
            { children }
        </GameStateContext.Provider>
    );
}