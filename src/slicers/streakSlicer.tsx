import { createSlice } from '@reduxjs/toolkit';

const initialState: number[] = [0, 0, 0, 0]

const streakSlicer = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    changeStreak: (_, action: { payload: number[] }) => [...action.payload]
  }
})

export const { changeStreak } = streakSlicer.actions
export default streakSlicer.reducer
