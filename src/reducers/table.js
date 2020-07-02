const tableReducer = (state = [], action) => {
  switch (action.type) {
    case 'MODIFY_TABLE':
      return action.table;
    case 'RESET_TABLE':
      return Array(3).fill(Array(3).fill(Array(3).fill(null)));
    default:
      return state;
  }
};

export default tableReducer;
