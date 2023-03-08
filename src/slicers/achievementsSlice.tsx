import { createSlice } from '@reduxjs/toolkit';
import Achievements from '../constants/Achievements';
import AchievementsInterface from '../interfaces/AchievementsInterface';

const initialState: AchievementsInterface = Achievements

const achievementsSlicer = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    restartAchievements: () => initialState,
    changeAchievement: (
      state = initialState,
      action: { payload: string }
    ) => ({
      ...state,
      [action.payload]: {
        status: true,
        popup: state[action.payload].popup,
        title: state[action.payload].title,
        description: state[action.payload].description
        }
    }),
    changeAchievementPopup: (
      state = initialState,
      action: { payload: string }
    ) => ({
      ...state,
      [action.payload]: {
        status: state[action.payload].status,
        popup: true,
        title: state[action.payload].title,
        description: state[action.payload].description
        }
    }),
  }
})

export const {
  restartAchievements, changeAchievement, changeAchievementPopup
} = achievementsSlicer.actions
export default achievementsSlicer.reducer
