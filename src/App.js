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
  table: Array(3).fill(Array(3).fill(Array(3).fill(null))),
  rules: {
    open: true,
    plus: false,
    same: false,
    elemental: false,
    sameWall: false,
    sudenDeath: false,
    random: false,
  },
  decks: {
    player: {
      deck1: Array(5).fill(null),
      deck2: Array(5).fill(null),
      deck3: Array(5).fill(null),
      deck4: Array(5).fill(null),
      deck5: Array(5).fill(null),
    },
    custom: {
      deck1: Array(5).fill(null),
      deck2: Array(5).fill(null),
      deck3: Array(5).fill(null),
      deck4: Array(5).fill(null),
      deck5: Array(5).fill(null),
    },
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
