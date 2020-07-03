const rulesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_RULES':
      return action.rules;
    default:
      return state;
  }
};

export default rulesReducer;
