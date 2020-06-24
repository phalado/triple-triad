const turnReducer = (state = null, action) => {
  // console.log('sate ', state);
  // console.log('action ', action);
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
