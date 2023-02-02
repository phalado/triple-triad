import { createSlice } from '@reduxjs/toolkit';

const initialState: { [card: string]: number } = {}

const playerCardsSlicer = createSlice({
  name: 'playerCards',
  initialState,
  reducers: {
    resetCardExplore: () => {},
    addCardExplore: (state = initialState, action: { payload: { card: string } }) => {
      const { card } = action.payload

      if (state[card]) return ({ ...state, [card]: state[card] + 1 })

      return ({ ...state, [card]: 1 })
    },
    removeCardExplore: (state = initialState, action: { payload: { card: string } }) => {
      const { card } = action.payload

      return ({ ...state, [card]: state[card] - 1 })
    }
  }
})

export const { resetCardExplore, addCardExplore, removeCardExplore } = playerCardsSlicer.actions
export default playerCardsSlicer.reducer
