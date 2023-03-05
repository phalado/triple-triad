import { createSlice } from '@reduxjs/toolkit';
import { NpcInterface, NpcsInterface } from '../interfaces/NpcsInterface';
import npcs from '../constants/Npcs'

const initialState: NpcsInterface = npcs

const npcsSlicer = createSlice({
  name: 'npcs',
  initialState,
  reducers: {
    createNpcList: () => initialState,
    addNpcToLocation: (
      state = initialState,
      action: { payload: { npc: NpcInterface, location: string } }
    ) => {
      const { npc, location } = action.payload

      return ({
        ...state,
        [location]: { ...state[location], ...npc }
      })
    },
    addCardNpc: (
      state = initialState,
      action: { payload: { npc: string, card: number, location: string } }
    ) => {
      const { npc, card, location } = action.payload

      return ({
        ...state,
        [location]: {
          ...state[location],
          [npc]: {
            ...state[location][npc],
            special: [...state[location][npc].special, card]
          }
        }
      })
    },
    removeCardNpc: (
      state = initialState,
      action: { payload: { npc: string, card: number, location: string } }
    ) => {
      const { npc, card, location } = action.payload

      return ({
        ...state,
        [location]: {
          ...state[location],
          [npc]: {
            ...state[location][npc],
            special: state[location][npc].special.filter(v => v !== card)
          }
        }
      })
    },
    changeNpcStreak: (
      state = initialState,
      action: { payload: { npc: string, streak: 'win' | 'loose' | 'tie', location: string } }
    ) => {
      const { npc, streak, location } = action.payload

      return ({
        ...state,
        [location]: {
          ...state[location],
          [npc]: {
            ...state[location][npc],
            [streak]: state[location][npc][streak] + 1
          }
        }
      })
    }
  }
})

export const { createNpcList, addCardNpc, removeCardNpc, changeNpcStreak, addNpcToLocation } = npcsSlicer.actions
export default npcsSlicer.reducer
