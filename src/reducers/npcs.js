import InitialState from '../constants/InicialState';

const npcsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD_NPC':
      if (action.data.npc === 'Card Queen') {
        return ({
          ...state,
          cardQueen: {
            ...state.cardQueen,
            special: [...state.cardQueen.special, action.data.card],
          },
        });
      }
      return ({
        ...state,
        [action.data.location]: {
          ...state[action.data.location],
          [action.data.npc]: {
            ...state[action.data.location][action.data.npc],
            special: [...state[action.data.location][action.data.npc].special, action.data.card],
          },
        },
      });
    case 'REMOVE_CARD_NPC':
      if (action.data.npc === 'Card Queen') {
        return ({
          ...state,
          cardQueen: {
            ...state.cardQueen,
            special: state.cardQueen.special.filter(v => v !== action.data.card),
          },
        });
      }
      return ({
        ...state,
        [action.data.location]: {
          ...state[action.data.location],
          [action.data.npc]: {
            ...state[action.data.location][action.data.npc],
            special: state[action.data.location][action.data.npc].special
              .filter(v => v !== action.data.card),
          },
        },
      });
    case 'CHANGE_NPC_STREAK':
      if (action.data.npc === 'Card Queen') {
        return ({
          ...state,
          cardQueen: {
            ...state.cardQueen,
            [action.data.streak]:
              state.cardQueen[action.data.streak] + 1,
          },
        });
      }
      return ({
        ...state,
        [action.data.location]: {
          ...state[action.data.location],
          [action.data.npc]: {
            ...state[action.data.location][action.data.npc],
            [action.data.streak]:
              state[action.data.location][action.data.npc][action.data.streak] + 1,
          },
        },
      });
    case 'CREATE_NPC_LIST':
      return ({
        ...InitialState.npcs,
      });
    case 'CHANGE_CARD_QUEEN_LOCATION':
      return ({
        ...state,
        cardQueen: {
          ...state.cardQueen,
          place: action.location,
        },
      });
    default:
      return state;
  }
};

export default npcsReducer;
