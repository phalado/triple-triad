import { createSlice } from '@reduxjs/toolkit';
import DecksInterface from '../interfaces/DecksInterface';

const initialState: DecksInterface = {
  player: {
    deck1: [1, 2, 4, 6, 7],
    deck2: [1, 2, 4, 6, 7],
    deck3: [1, 2, 4, 6, 7],
    deck4: [1, 2, 4, 6, 7],
    deck5: [1, 2, 4, 6, 7],
  },
  custom: {
    deck1: Array(5).fill(1),
    deck2: Array(5).fill(2),
    deck3: Array(5).fill(3),
    deck4: Array(5).fill(4),
    deck5: Array(5).fill(5),
  },
}

const decksSlicer = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    startDecks: () => initialState,
    changeDeck: (
      state = initialState,
      action: { payload: { player: boolean, deck: string, cards: number[] } }
    ) => {
      const { player, deck, cards } = action.payload

      if (player) return {
        player: { ...state.player, [deck]: [...cards] },
        custom: state.custom
      }

      return {
        player: state.player,
        custom: { ...state.custom, [deck]: [...cards] }
      }
    }
  }
})

export const { startDecks, changeDeck } = decksSlicer.actions
export default decksSlicer.reducer
