const tableReducer = (state = null, action) => {
  switch (action.type) {
    case 'MODIFY_TABLE':
      return ({
        table: action.teble,
      });
    default:
      return state;
  }
};

export default tableReducer;
