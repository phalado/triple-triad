import InitialState from '../constants/InicialState';

const npcsReducer = (state = {}, action) => {
  const { location, npc } = action;
  switch (action.type) {
    case 'ADD_CARD_NPC':
      return ({
        ...state.npcs,
        [location]: {
          ...state[location],
          [npc]: {
            ...state[location][npc],
            special: [...state[location][npc].special, action.card],
          },
        },
      });
    case 'REMOVE_CARD_NPC':
      return ({
        ...state.npcs,
        [location]: {
          ...state[location],
          [npc]: {
            ...state[location][npc],
            special: state[location][npc].special.filter(v => v !== action.card),
          },
        },
      });
    case 'CHANGE_NPC_STREAK':
      return ({
        ...state.npcs,
        [location]: {
          ...state[location],
          [npc]: {
            ...state[location][npc],
            [action.streak]: action.streak + action.value,
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
