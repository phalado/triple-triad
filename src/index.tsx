import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './Navigation';
import { GameProvider } from './components/GameContext';

import decksReducer from './slicers/decksSlicer'
import eventsReducer from './slicers/eventsSlicer'
import streakReducer from './slicers/streakSlicer'
import npcsReducer from './slicers/npcsSlicer'
import playerCardsReducer from './slicers/playerCardSlicer'
import rulesReducer from './slicers/rulesSlicer'
import preLoadedSoundsReducer from './slicers/preLoadedSoundsSlicer';
import cardQueenReducer from './slicers/cardQueenSlicer';
import gameOptionsReducer from './slicers/gameOptions';
import achievementsReducer from './slicers/achievementsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['cards'],
};

const rootReducer = combineReducers({
  decks: decksReducer,
  events: eventsReducer,
  streak: streakReducer,
  npcs: npcsReducer,
  playerCards: playerCardsReducer,
  rules: rulesReducer,
  preLoadedSounds: preLoadedSoundsReducer,
  cardQueen: cardQueenReducer,
  gameOptions: gameOptionsReducer,
  achievements: achievementsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});
const persistor = persistStore(store);

const ReduxProvider = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GameProvider>
        <Navigation />
      </GameProvider>
    </PersistGate>
  </Provider>
);

export default ReduxProvider;
