import InitialState from '../constants/InicialState';

const rulesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_RULES':
      return {
        ...state,
        [action.data.location]: {
          ...state[action.data.location],
          [action.data.rule]: ![action.data.rule],
        },
      };
    case 'RESTART_RULES':
      return InitialState.rules;
    default:
      return state;
  }
};

export default rulesReducer;
