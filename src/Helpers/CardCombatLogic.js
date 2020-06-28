import Rules from '../constants/Rules';

const getRank = (rank, cardElement, element) => {
  if (Rules.elemental) {
    if (element !== null) {
      return element === cardElement ? rank + 1 : rank - 1;
    }
    return rank;
  }
  return rank;
};

const CardCombat = (props, newRow, newColumn, rank1, rank2) => {
  const {
    card, table, element, player, handleAddCard, handleRemoveCard, handleChangeTable,
  } = props;

  if (table[newRow][newColumn][1] === player) return;

  const otherCard = table[newRow][newColumn][0];
  const atk = getRank(card.ranks[rank1], card.element, element);
  const def = getRank(otherCard.ranks[rank2], otherCard.element, table[newRow][newColumn][2]);
  if (def >= atk) return;

  table[newRow][newColumn][1] = player;
  handleChangeTable(table);
  handleRemoveCard({ player: !player, id: otherCard.id });
  handleAddCard({
    player, id: otherCard.id, row: newRow, column: newColumn, dragable: false,
  });
};

export default CardCombat;
