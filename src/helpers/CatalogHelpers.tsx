import Cards from "../constants/Cards";

const getCardCatalogTableData = (playerCards: { [card: string]: number }, level: number) => {
  return Cards.filter(card => card.level === level).map(card => (
    [card.id, card.name, card.element, playerCards[card.id]]
  ))
}

const getCardAlbumData = (playerCards: { [card: string]: number }, level: number) => {
  return Cards.filter(card => card.level === level).map(card => (
    [card.id, playerCards[card.id] ? card.name : '?????']
  ))
}

export { getCardCatalogTableData, getCardAlbumData }
