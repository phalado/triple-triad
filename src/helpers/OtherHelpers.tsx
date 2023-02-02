import React from 'react';
import { Alert, View, Button } from 'react-native';

const getRandomBoolean = () => Math.floor(100 * Math.random()) % 2 === 0
const getRandomNumber = (min: number, max: number) => (
  (Math.floor(1000000 * Math.random()) % (max - min)) + min
)

const cardsOnTheTable = (table: any) => table.flat().filter((field: any) => !!field[0]).length;

const getRandomCards = () => {
  const cards = [];
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(1, 55));
  cards.push(getRandomNumber(56, 77));
  cards.push(getRandomNumber(78, 99));
  cards.push(getRandomNumber(100, 110));
  return cards;
};

export {
  getRandomBoolean,
  getRandomNumber,
  cardsOnTheTable,
  getRandomCards,
}
