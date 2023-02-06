import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './Navigation';

import tableReducer from './slicers/tableSlicer'
import cardsReducer from './slicers/cardsSlicer'
import decksReducer from './slicers/decksSlicer'
import eventsReducer from './slicers/eventsSlicer'
import streakReducer from './slicers/streakSlicer'
import npcsReducer from './slicers/npcsSlicer'
import playerCardsReducer from './slicers/playerCardSlicer'
import rulesReducer from './slicers/rulesSlicer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['table', 'cards'],
};

const rootReducer = combineReducers({
  table: tableReducer,
  cards: cardsReducer,
  decks: decksReducer,
  events: eventsReducer,
  streak: streakReducer,
  npcs: npcsReducer,
  playerCards: playerCardsReducer,
  rules: rulesReducer
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
      <Navigation />
    </PersistGate>
  </Provider>
);

export default ReduxProvider;