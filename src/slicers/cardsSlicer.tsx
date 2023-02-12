import { createSlice } from '@reduxjs/toolkit';
import CardInterface from '../interfaces/CardInterface';

const initialState: {
  player1Cards: CardInterface[],
  player2Cards: CardInterface[]
} = {
  player1Cards: [],
  player2Cards: []
}

const cardsSlicer = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // createCard: (
    //   state = initialState,
    //   action: { payload: { player: boolean, card: CardInterface } }
    // ) => {
    //   const { card, player } = action.payload

    //   if (player) return({
    //     player1Cards: [...state.player1Cards, { ...card }],
    //     player2Cards: state.player2Cards,
    //   })

    //   return ({
    //     player1Cards: state.player1Cards,
    //     player2Cards: [...state.player2Cards, { ...action.payload.card }],
    //   })
    // },
    // removeCard: (
    //   state = initialState,
    //   action: { payload: { player: boolean, row: number, column: number } }
    // ) => {
    //   const { row, column, player } = action.payload

    //   if (player) return({
    //     player1Cards: [
    //       ...state.player1Cards.filter(card => card.row != row || card.column !== column)
    //     ],
    //     player2Cards: state.player2Cards,
    //   })

    //   return ({
    //     player1Cards: state.player1Cards,
    //     player2Cards: [
    //       ...state.player2Cards.filter(card => card.row != row || card.column !== column)
    //     ],
    //   })
    // },
    // resetCards: () => initialState
  }
})

export const { createCard, removeCard, resetCards } = cardsSlicer.actions
export default cardsSlicer.reducer
