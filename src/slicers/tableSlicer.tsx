import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  [[null, null, null], [null, null, null], [null, null, null]],
  [[null, null, null], [null, null, null], [null, null, null]],
  [[null, null, null], [null, null, null], [null, null, null]],
];

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
