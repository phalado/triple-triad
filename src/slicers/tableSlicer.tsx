import { createSlice } from '@reduxjs/toolkit';
import TableInterface, { CellInterface, RowInterface } from '../interfaces/TableInterface';

const cell: CellInterface = {
  card: null,
  player: null,
  element: null
}

const initialState: TableInterface = [
  [Object.assign({}, cell), Object.assign({}, cell), Object.assign({}, cell)],
  [Object.assign({}, cell), Object.assign({}, cell), Object.assign({}, cell)],
  [Object.assign({}, cell), Object.assign({}, cell), Object.assign({}, cell)]
];

const copyTable = (table: TableInterface) => ([
  ...table.map((row: RowInterface) => ([
    ...row.map((cell: CellInterface) => ({ ...cell }))
  ]))
])

const tableSlicer = createSlice({
  name: 'table',
  initialState,
  reducers: {
    modifyTable: (_, action: { payload: any }) => action.payload,
    resetTable: () => initialState
  }
})

export const { modifyTable, resetTable } = tableSlicer.actions
export default tableSlicer.reducer
