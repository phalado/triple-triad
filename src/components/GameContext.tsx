import React, { createContext, ReactElement, useEffect, useState } from "react";
import { getRandomBoolean } from "../helpers/OtherHelpers";
import CardInterface from "../interfaces/CardInterface";
import CardObjectInterface from "../interfaces/CardObjectInterface";
import PlayerCardsInterface from "../interfaces/PlayersCardsInterface";
import TableInterface, { CellInterface, RowInterface } from "../interfaces/TableInterface";

export const GameContext = createContext<any>({
  table: [],
  cards: {},
  setTable: () => {},
  cloneTable: () => {},
  resetTable: () => {},
  updateTable: () => {},
  getCellElement: () => {},
  cardsOnTheTable: () => {},
  resetCards: () => {},
  createCard: () => {},
  removeCard: () => {},
  placeCard: () => {},
  existCard: () => {},
  turn: true,
  setTurn: () => {}
})


export const GameProvider = ({ children }: { children: ReactElement }) => {
  const [table, setTable] = useState<TableInterface>([])
  const [cards, setcards] = useState<PlayerCardsInterface>({ player1Cards: [], player2Cards: [] })
  const [turn, setTurn] = useState(getRandomBoolean())

  const cardsOnTheTable = () => table.flat().filter((field: CellInterface) => field.card).length

  const cell: CellInterface = { card: null, player: null, element: null }
  const initialState = [
    [Object.assign({}, cell), Object.assign({}, cell), Object.assign({}, cell)],
    [Object.assign({}, cell), Object.assign({}, cell), Object.assign({}, cell)],
    [Object.assign({}, cell), Object.assign({}, cell), Object.assign({}, cell)]
  ]

  const cloneTable = (table: TableInterface) => (
    table.map((row: RowInterface) => row.map((cell: CellInterface) => ({ ...cell }))
  ));

  const resetTable = () => setTable(cloneTable(initialState))

  const updateTable = (row: number, col: number, cell: CellInterface) => {
    setTable(prev => ([
      ...prev.map((tblRow, i) => {
        if (row !== i) return tblRow
  
        return [...tblRow.map((tblCell, j) => j !== col ? { ...tblCell } : { ...cell })]
      })
    ]))
  }

  const getCellElement = (row: number, column: number) => table[row][column].element

  const resetCards = () => setcards({ player1Cards: [], player2Cards: [] })

  const createCard = (player: boolean, card: CardInterface) => setcards(prev => {
    const whichPlayer = player ? 'player1Cards' : 'player2Cards'

    return ({ ...prev, [whichPlayer]: [...prev[whichPlayer], { ...card }] })
  })

  const removeCard = (player: boolean, row: number, column: number) => setcards(prev => {
    const whichPlayer = player ? 'player1Cards' : 'player2Cards'

    return ({
      ...prev,
      [whichPlayer]: [
        ...prev[whichPlayer].filter(card => card.row !== row || card.column !== column)
      ]
    })
  })

  const placeCard = (
    player: boolean,
    card: CardObjectInterface,
    oldRow: number,
    oldColumn: number,
    row: number,
    column: number,
    turn?: boolean
  ) => {
    updateTable(row, column, { card, player, element: table[row][column].element })
    removeCard(turn ? !player : player, oldRow, oldColumn)
    createCard(player, { id: card.id, row, column, dragable: false })
  }

  const existCard = (row: number, column: number) => {
    if (row < 0 || row > 2 || column < 0 || column > 2) return false

    return table[row][column].card !== null
  }

  return (
    <GameContext.Provider value={{
      table,
      cards,
      setTable,
      cloneTable,
      resetTable,
      updateTable,
      getCellElement,
      cardsOnTheTable,
      resetCards,
      createCard,
      removeCard,
      placeCard,
      existCard,
      turn,
      setTurn
    }}>
      {children}
    </GameContext.Provider>
  )
}