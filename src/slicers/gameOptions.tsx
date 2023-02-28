import { createSlice } from '@reduxjs/toolkit';
import GameOptionsInterface from '../interfaces/GameOptionsInterface';

const initialState: GameOptionsInterface = {
  language: 'eng',
  lastLocation: 'balambGarden',
  username: 'Squall'
}

const gameOptionsSlicer = createSlice({
  name: 'gameOptions',
  initialState,
  reducers: {
    restartGameOptions: () => initialState,
    changeLastLocation: (
      state = initialState,
      action: { payload: string }
    ) => ({ ...state, lastLocation: action.payload }),
    changeUsername: (
      state = initialState,
      action: { payload: string }
    ) => ({ ...state, username: action.payload }),
    changeGameLanguage: (
      state = initialState,
      action: { payload: string }
    ) => ({ ...state, language: action.payload }),
  }
})

export const {
  restartGameOptions, changeLastLocation,changeUsername, changeGameLanguage
} = gameOptionsSlicer.actions
export default gameOptionsSlicer.reducer
