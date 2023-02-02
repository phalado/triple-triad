import { createSlice } from '@reduxjs/toolkit';
import eventsInicialState from '../constants/Events'

const initialState: { [event: string]: boolean } = eventsInicialState

const eventsSlicer = createSlice({
  name: 'events',
  initialState,
  reducers: {
    restartEvents: () => initialState,
    changeEvent: (
      state = initialState,
      action: { payload: string }
    ) => ({ ...state, [action.payload]: false })
  }
})

export const { restartEvents, changeEvent } = eventsSlicer.actions
export default eventsSlicer.reducer
