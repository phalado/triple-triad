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
  turn: null,
};

const store = createStore{
  rootReducer,
  initialState,
};

const App = () => {
  <Provider store={store}>
    <Navigation />
  </Provider>
};

export default App;
