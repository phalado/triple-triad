const decksReducer = (state = {}, action) => {
  switch (action.type) {
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
