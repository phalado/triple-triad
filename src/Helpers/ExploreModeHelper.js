const getTableData = (npcs, place) => {
  const tableData = [];

  // eslint-disable-next-line no-unused-vars
  Object.entries(npcs[place]).forEach(([key, value]) => {
    const {
      name, win, loose, tie,
    } = value;
    tableData.push([name, win, loose, tie, 'Chalenge']);
  });

  return tableData;
};

export { getTableData };
