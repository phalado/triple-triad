import { createSlice } from '@reduxjs/toolkit';
import PlaceRules from '../constants/PlaceRules';
import RulesInterface from '../interfaces/RulesInterface';

const initialState: RulesInterface = PlaceRules

const rulesSlicer = createSlice({
  name: 'events',
  initialState,
  reducers: {
    restartRules: () => initialState,
    changeRules: (
      state = initialState,
      action: { payload: { location: string, rule: string } }) => {
        const { location, rule } = action.payload

        return {
          ...state,
          [location]: { ...state[location], [rule]: !state.rule }
        }
      }
  }
})

export const { restartRules, changeRules } = rulesSlicer.actions
export default rulesSlicer.reducer
