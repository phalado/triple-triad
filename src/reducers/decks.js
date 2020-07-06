const decksReducer = (state = {}, action) => {
  switch (action.type) {
    case 'START_DECKS':
      return {
        player: {
          deck1: Array(5).fill(6),
          deck2: Array(5).fill(7),
          deck3: Array(5).fill(8),
          deck4: Array(5).fill(9),
          deck5: Array(5).fill(10),
        },
        custom: {
          deck1: Array(5).fill(1),
          deck2: Array(5).fill(2),
          deck3: Array(5).fill(3),
          deck4: Array(5).fill(4),
          deck5: Array(5).fill(5),
        },
      };
    case 'CHANGE_DECKS':
      if (action.player) {
        return {
          player: {
            ...state.player,
            [action.deck]: action.cards,
          },
          custom: state.custom,
        };
      }
      return {
        player: state.player,
        custom: {
          ...state.custom,
          [action.deck]: action.cards,
        },
      };
    default:
      return state;
  }
};

export default decksReducer;
