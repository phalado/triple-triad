import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  gameMusic: {},
  cardSound: {},
  specialSound: {}
}

const PreLoadedSoundsSlice = createSlice({
  name: 'preLoadedSounds',
  initialState,
  reducers: {
    loadSound: (
      state = initialState,
      action: { payload: { name: string, sound: any } }
    ) => ({ ...state, [action.payload.name]: action.payload.sound })
  }
})

export const { loadSound } = PreLoadedSoundsSlice.actions
export default PreLoadedSoundsSlice.reducer
