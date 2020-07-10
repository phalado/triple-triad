const streakReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_STREAK':
      return action.streak;
    default:
      return state;
  }
};

export default streakReducer;
