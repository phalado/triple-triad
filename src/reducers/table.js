const tableReducer = (state = [], action) => {
  switch (action.type) {
    case 'MODIFY_TABLE':
      return action.table;
    case 'RESET_TABLE':
      return [
        [[null, null, null], [null, null, null], [null, null, null]],
        [[null, null, null], [null, null, null], [null, null, null]],
        [[null, null, null], [null, null, null], [null, null, null]],
      ];
    default:
      return state;
  }
};

export default tableReducer;
