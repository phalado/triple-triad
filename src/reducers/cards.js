const cardReducer = (state = { play1Cards: [], play2Cards: [] }, action) => {
  switch (action.type) {
    case 'CREATE_CARD':
      if (action.player) {
        return ({
          play1Cards: [
            ...state.play1Cards,
            {
              id: action.id,
              row: action.row,
              column: action.column,
              dragable: action.dragable,
            },
          ],
          play2Cards: state.play2Cards,
        });
      }
      return ({
        play1Cards: state.play1Cards,
        play2Cards: [
          ...state.play2Cards,
          {
            id: action.id,
            row: action.row,
            column: action.column,
            dragable: action.dragable,
          },
        ],
      });
    case 'REMOVE_CARD':
      if (action.player) {
        const removable = state.play1Cards.find(c => c.id === action.id);
        return ({
          play1Cards: state.play1Cards.filter(c => c !== removable),
          play2Cards: state.play2Cards,
        });
      }
      // eslint-disable-next-line no-case-declarations
      const removable = state.play2Cards.find(c => c.id === action.id);
      return ({
        play1Cards: state.play1Cards,
        play2Cards: state.play2Cards.filter(c => c !== removable),
      });
    default:
      return state;
  }
};

export default cardReducer;
