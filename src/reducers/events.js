import InitialState from '../constants/InicialState';

const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_EVENT':
      return { ...state, [action.event]: false };
    case 'RESTART_EVENTS':
      return { ...InitialState.events };
    default:
      return state;
  }
};

export default eventsReducer;
