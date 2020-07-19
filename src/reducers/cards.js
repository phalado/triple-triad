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
      console.log(action);
      console.log(state.play1Cards);
      console.log(state.play1Cards.filter(c => c.row !== action.row || c.column !== action.column));
      if (action.player) {
        return ({
          play1Cards: state.play1Cards
            .filter(c => c.row !== action.row || c.column !== action.column),
          play2Cards: state.play2Cards,
        });
      }
      return ({
        play1Cards: state.play1Cards,
        play2Cards: state.play2Cards
          .filter(c => c.row !== action.row || c.column !== action.column),
      });
    case 'RESET_CARDS':
      return ({
        play1Cards: [],
        play2Cards: [],
      });
    default:
      return state;
  }
};

export default cardReducer;
