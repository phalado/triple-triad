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
        id: state[action.payload].id,
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
        popup: true,
        id: state[action.payload].id,
        status: state[action.payload].status,
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
