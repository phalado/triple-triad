const turnReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_TURN':
      return action.turn;
    case 'CHANGE_TURN':
      return action.turn;
    default:
      return state;
  }
};

export default turnReducer;
