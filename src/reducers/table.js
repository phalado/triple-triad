const tableReducer = (state = [], action) => {
  switch (action.type) {
    case 'MODIFY_TABLE':
      return action.table;
    default:
      return state;
  }
};

export default tableReducer;
