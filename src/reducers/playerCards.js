const playerCardsReducer = (state = {}, action) => {
  const { card } = action;
  switch (action.type) {
    case 'ADD_CARD_EXPLORE':
      if (state[card]) {
        return ({
          ...state,
          [card]: state[card] + 1,
        });
      }
      return ({
        ...state,
        [card]: 1,
      });
    case 'REMOVE_CARD_EXPLORE':
      return ({
        ...state,
        [card]: state[card] - 1,
      });
    case 'RESET_CARD_EXPLORE':
      return {};
    default:
      return state;
  }
};

export default playerCardsReducer;
