import React, { StyleHTMLAttributes } from 'react';
import { Alert, View, Button } from 'react-native';
import CardInterface from '../interfaces/CardInterface';
import TableInterface, { CellInterface, RowInterface } from '../interfaces/TableInterface';

const getRandomBoolean = () => Math.floor(100 * Math.random()) % 2 === 0
const getRandomNumber = (min: number, max: number) => (
  (Math.floor(1000000 * Math.random()) % (max - min)) + min
)

const cardsOnTheTable = (table: any) => table.flat().filter((field: any) => !!field[0]).length;

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
    navigation: any
  }
) => {
  const {
    resetCards, resetTable, createCard, navigation,
  } = props;

  Alert.alert('Wait!', 'If you leave this game will be canceled. Are you sure?', [
    {
      text: 'I can\'t just run away. (Cancel)',
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: 'Whatever (Ok)',
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

const cloneTable = (table: TableInterface) => (
  table.map((row: RowInterface) => row.map((cell: CellInterface) => ({ ...cell }))
));

export {
  getRandomBoolean,
  getRandomNumber,
  cardsOnTheTable,
  getCardContainer,
  getRandomCards,
  resetGame,
  cloneTable
}
