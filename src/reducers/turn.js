const turnReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_TURN':
      return ({
        turn: action.turn,
      });
    case 'CHANGE_TURN':
      return ({
        turn: action.turn,
      });
    default:
      return state;
  }
};

export default turnReducer;
