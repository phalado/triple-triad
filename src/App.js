import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Navigation from './Navigation';
import rootReducer from './reducers';

const initialState = {
  cards: {
    play1Cards: [],
    play2Cards: [],
  },
  table: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  rules: {
    open: true,
    plus: false,
    same: false,
    elemental: false,
    sameWall: false,
    sudenDeath: false,
    random: false,
  },
};

const store = createStore(
  rootReducer,
  initialState,
);

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
