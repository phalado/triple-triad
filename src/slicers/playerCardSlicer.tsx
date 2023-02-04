import { createSlice } from '@reduxjs/toolkit';

const initialState: { [card: string]: number } = {}

const playerCardsSlicer = createSlice({
  name: 'playerCards',
  initialState,
  reducers: {
    resetCardExplore: () => ({}),
    addCardExplore: (state = initialState, action: { payload: number }) => {
      if (state[action.payload]) return ({ ...state, [action.payload]: state[action.payload] + 1 })

      return ({ ...state, [action.payload]: 1 })
    },
    removeCardExplore: (state = initialState, action: { payload: number }) => {
      return ({ ...state, [action.payload]: state[action.payload] - 1 })
    }
  }
})

export const { resetCardExplore, addCardExplore, removeCardExplore } = playerCardsSlicer.actions
export default playerCardsSlicer.reducer
