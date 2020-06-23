const CardCombat = (props, newRow, newColumn, rank1, rank2) => {
  const {
    card, table, player, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;

  if (table[newRow][newColumn][1] === player) return;

  const otherCard = table[newRow][newColumn][0];
  if (otherCard.ranks[rank2] >= card.ranks[rank1]) return;

  table[newRow][newColumn][1] = player;
  handleChangeTable(table);
  handleRemoveCard({ player: !player, id: otherCard.id });
  handleAddCard({
    player, id: otherCard.id, row: newRow, column: newColumn, dragable: false,
  });
};

export default CardCombat;
