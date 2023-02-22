import Cards from "../constants/Cards";

const getCardCatalogTableData = (playerCards: { [card: string]: number }, level: number) => {
  return Cards.filter(card => card.level === level).map(card => (
    // { id: card.id, name: card.name, element: card.element, quantity: playerCards[card.id] }
    [card.id, card.name, card.element, playerCards[card.id]]
  ))
}

export default getCardCatalogTableData;