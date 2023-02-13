import { createSlice } from '@reduxjs/toolkit';
import CardQueen from '../constants/CardQueen';
import CardQueenInterface from '../interfaces/CardQueenInterface';

const initialState: CardQueenInterface = CardQueen

const cardQueenSlicer = createSlice({
  name: 'cardQueen',
  initialState,
  reducers: {
    resetCardQueen: () => initialState,
    changeCardQueenPlace: (state = initialState, action: { payload: string }) => ({
      ...state,
      place: action.payload
    }),
    addSpecialCardQueen: (state = initialState, action: { payload: number }) => ({
      ...state,
      special: [...state.special, action.payload]
    }),
    removeSpecialCardQueen: (state = initialState, action: { payload: number }) => ({
      ...state,
      special: state.special.filter(card => card !== action.payload)
    }),
    changeCardQueenStreak: (
      state = initialState,
      action: { payload:  'win' | 'loose' | 'tie' }
    ) => ({ ...state, [action.payload]: state[action.payload] + 1 })
  }
})

export const {
  resetCardQueen,
  changeCardQueenPlace,
  addSpecialCardQueen,
  removeSpecialCardQueen,
  changeCardQueenStreak
} = cardQueenSlicer.actions
export default cardQueenSlicer.reducer
