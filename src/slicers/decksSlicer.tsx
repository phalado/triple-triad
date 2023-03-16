import { createSlice } from '@reduxjs/toolkit';
import DecksInterface from '../interfaces/DecksInterface';

const initialState: DecksInterface = {
  deck1: [0, 0, 0, 0, 0],
  deck2: [0, 0, 0, 0, 0],
  deck3: [0, 0, 0, 0, 0],
  deck4: [0, 0, 0, 0, 0],
  deck5: [0, 0, 0, 0, 0],
  selected: 'deck1'
}

const decksSlicer = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    startDecks: () => initialState,
    changeDeck: (
      state = initialState,
      action: { payload: { deck: string, cards: number[] } }
    ) => ({ ...state, [action.payload.deck]: [...action.payload.cards] }),
    changeSelectedDeck: (
      state = initialState,
      action: { payload: '' | 'deck1' | 'deck2' | 'deck3' | 'deck4' | 'deck5' }
    ) => ({ ...state, selected: action.payload })
  }
})

export const { startDecks, changeDeck, changeSelectedDeck } = decksSlicer.actions
export default decksSlicer.reducer
