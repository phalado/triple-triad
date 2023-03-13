import { Alert } from 'react-native';
import CardInterface from '../interfaces/CardInterface';

const getRandomBoolean = () => Math.floor(100 * Math.random()) % 2 === 0
const getRandomNumber = (min: number, max: number) => (
  (Math.floor(1000000 * Math.random()) % (max - min)) + min
)

const getCardContainer = (
  row: number, column: number, player: boolean, scrennHeight: number, styles: any
) => {
  let cardContainer = styles.container;

  if (row === 0) cardContainer = { ...cardContainer, ...styles.topRow };
  else if (row === 1) cardContainer = { ...cardContainer, ...styles.centerRow };
  else if (row === 2) cardContainer = { ...cardContainer, ...styles.bottomRow };
  else {
    const value = (scrennHeight * 0.15) + (row - 3) * scrennHeight * 0.1;
    cardContainer = player ? { ...cardContainer, top: value, right: '2.5%' }
      : { ...cardContainer, top: value, left: '2.5%' };
  }

  if (column === 0) cardContainer = { ...cardContainer, ...styles.leftColumn };
  else if (column === 1) cardContainer = { ...cardContainer, ...styles.centerColumn };
  else if (column === 2) cardContainer = { ...cardContainer, ...styles.rightColumn };

  return cardContainer;
};

const getRandomCards = () => {
  const cards = [];
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(56, 77));
  cards.push(getRandomNumber(78, 99));
  cards.push(getRandomNumber(100, 110));
  return cards;
};

const resetGame = (
  props: {
    resetCards: () => void,
    resetTable: () => void,
    createCard: (player: boolean, card: CardInterface) => void,
    navigation: any,
    texts: { [key: string]: string }
  }
) => {
  const { resetCards, resetTable, createCard, navigation, texts } = props;

  Alert.alert(texts.wait as string, texts.giveUpGame as string, [
    {
      text: texts.runAway as string,
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: texts.whatever as string,
      onPress: () => {
        navigation.pop();
        resetTable();
        resetCards();

        let newCards = getRandomCards();
        newCards.forEach((card, index) => {
          createCard(true, { id: card, row: 3 + index, column: 3, dragable: true });
        });

        newCards = getRandomCards();
        newCards.forEach((card, index) => {
          createCard(false, { id: card, row: 3 + index, column: 3, dragable: true });
        });
      },
    },
  ]);
};

const getCardsId = (cards: CardInterface[]) => {
  const newP1Cards: CardInterface[] = [];
  const newP2Cards: CardInterface[] = [];
  cards.forEach(card => newP1Cards.push(card));

  let value = 0;
  while (newP1Cards.length > 5) {
    value = getRandomNumber(0, newP1Cards.length);
    newP2Cards.push(newP1Cards[value]);
    newP1Cards.splice(value, 1);
  }

  return ({ newP1Cards, newP2Cards });
};

export {
  getRandomBoolean,
  getRandomNumber,
  getCardContainer,
  getRandomCards,
  resetGame,
  getCardsId
}
