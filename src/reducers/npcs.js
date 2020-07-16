import InitialState from '../constants/InicialState';

const npcsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD_NPC':
      return ({
        ...state,
        [action.data.location]: {
          ...state[action.data.location],
          [action.data.npc]: {
            ...state[action.data.location][action.data.npc],
            special: [...state[action.data.location][action.data.npc].special, action.card],
          },
        },
      });
    case 'REMOVE_CARD_NPC':
      return ({
        ...state,
        [action.data.location]: {
          ...state[action.data.location],
          [action.data.npc]: {
            ...state[action.data.location][action.data.npc],
            special: state[action.data.location][action.data.npc].special.filter(v => v !== action.data.card),
          },
        },
      });
    case 'CHANGE_NPC_STREAK':
      console.log(state[action.data.location][action.data.npc][action.data.streak]);
      return ({
        ...state,
        [action.data.location]: {
          ...state[action.data.location],
          [action.data.npc]: {
            ...state[action.data.location][action.data.npc],
            [action.data.streak]: state[action.data.location][action.data.npc][action.data.streak] + 1,
          },
        },
      });
    case 'CREATE_NPC_LIST':
      return ({
        ...InitialState.npcs,
      });
    default:
      return state;
  }
};

export default npcsReducer;
