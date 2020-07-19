import React, { useState } from 'react';
import {
  View, Image, Text, Button, TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import RankNumbers from './RankNumbers';
import { cardsOnTheTable, getRandomCards, getCardsId } from '../Helpers/OtherHelpers';
import {
  gameMusicStop, winThemeStop, looseThemeStop,
} from '../constants/Sounds';
import Images from '../constants/Images';
import Cards from '../constants/Cards';
import styles from '../styles/ModalScreen';

const ModalScreen = props => {
  const {
    cards, table, rules, createCard, resetCards, resetTable, playerCards,
    visible, turn, gameOver, navigation, value, npcDeck, location, npc,
    addCardToNPC, removeCardFromNPC, addCardToExploreDeck, removeCardFromExploreDeck,
    changeNPCStreak,
  } = props;
  const [initialCards] = useState({
    play1Cards: [...cards.play1Cards],
    play2Cards: [...cards.play2Cards],
  });

  if (value !== 'none') {
    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <Image
            style={styles.gameOverImage}
            source={Images[value]}
            alt="Cursor"
          />
        </View>
      </Modal>
    );
  }

  if (gameOver) {
    const resetGame = () => {
      resetTable();
      resetCards();

      let newCards = getRandomCards();
      newCards.forEach((card, index) => {
        createCard({
          player: true, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      newCards = getRandomCards();
      newCards.forEach((card, index) => {
        createCard({
          player: false, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      navigation.pop();
    };

    const sudenDeathGame = () => {
      resetTable();
      const allCards = getCardsId([...cards.play1Cards, ...cards.play2Cards]);
      resetCards();

      allCards.newP1Cards.forEach((card, index) => {
        createCard({
          player: true, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      allCards.newP2Cards.forEach((card, index) => {
        createCard({
          player: false, id: card, row: 3 + index, column: 3, dragable: true,
        });
      });

      navigation.pop();
      navigation.push('GamePlay', { screen: 'GamePlay' });
    };

    if (rules.sudenDeath && gameOver === 'tie') {
      // setTimeout(() => sudenDeathGame(), 2000);
      sudenDeathGame();
      return (
        <Modal isVisible={visible}>
          <View style={styles.container}>
            <Image
              style={styles.gameOverImage}
              source={Images[gameOver]}
              alt="Cursor"
            />
          </View>
        </Modal>
      );
    }

    if (gameOver === 'win') {
      console.log('win');
      gameMusicStop();
      // winThemePlay();
    } else if (gameOver === 'loose') {
      console.log('loose');
      gameMusicStop();
      // looseThemePlay();
    } else console.log('tie');

    if (npcDeck) {
      console.log(visible, gameOver, location, npc);

      const winCard = cardId => {
        if (cardId === 84 || cardId > 77) removeCardFromNPC({ location, npc, card: cardId });
        changeNPCStreak({ location, npc, streak: 'win' });
        addCardToExploreDeck(cardId);
        navigation.pop();
      };

      const looseCard = cardId => {
        if (cardId === 84 || cardId > 77) addCardToNPC({ location, npc, card: cardId });
        changeNPCStreak({ location, npc, streak: 'loose' });
        removeCardFromExploreDeck(cardId);
      };

      const getCardName = (name, cardId) => {
        let nameStyle = styles.chooseCardNameWhite;
        if (playerCards[cardId]) {
          if (playerCards[cardId] === 0) nameStyle = styles.chooseCardNameYellow;
        } else nameStyle = styles.chooseCardNameBlue;
        return <Text style={nameStyle}>{name}</Text>;
      };

      const loadCard = (thisCard, player, index) => {
        const newCard = Cards.find(crd => crd.id === thisCard.id);
        const thisPlayer = player ? 'player1' : 'player2';
        // console.log(newCard.name, player);
        if (player) {
          return (
            <View key={[thisCard, player, index]}>
              {getCardName(newCard.name, newCard.id)}
              <View style={styles.chooseCardImage}>
                <Image style={styles.insideChooseCard} source={Images[thisPlayer]} alt="Background" />
                <Image style={styles.insideChooseCard} source={Images[newCard.id]} alt="Card" />
                <RankNumbers
                  ranks={newCard.ranks}
                  element={newCard.element}
                  table={table}
                  playCard={{ row: 0, column: 0, dragable: false }}
                />
              </View>
            </View>
          );
        }

        return (
          <View key={[thisCard, player, index]}>
            {getCardName(newCard.name, newCard.id)}
            <TouchableOpacity style={styles.chooseCardImage} onPress={() => winCard(thisCard.id)}>
              <Image style={styles.insideChooseCard} source={Images[thisPlayer]} alt="Background" />
              <Image style={styles.insideChooseCard} source={Images[newCard.id]} alt="Card" />
              <RankNumbers
                ranks={newCard.ranks}
                element={newCard.element}
                table={table}
                playCard={{ row: 0, column: 0, dragable: false }}
              />
            </TouchableOpacity>
          </View>
        );
      };

      if (gameOver === 'win') {
        const looserDeck = initialCards.play2Cards;
        return (
          <Modal isVisible={visible}>
            <View style={styles.container}>
              <Image
                style={styles.gameOverImage}
                source={Images[gameOver]}
                alt="Cursor"
              />
              <Text style={styles.chooseCardText}>Choose one card</Text>
              <View style={styles.chooseCardContainer}>
                {looserDeck.map((thisCard, index) => loadCard(thisCard, false, index))}
              </View>
            </View>
          </Modal>
        );
      }

      if (gameOver === 'loose') {
        const looserDeck = initialCards.play1Cards;
        return (
          <Modal isVisible={visible}>
            <View style={styles.container}>
              <Image
                style={styles.gameOverImage}
                source={Images[gameOver]}
                alt="Cursor"
              />
              <Text style={styles.chooseCardText}>One card will be choosen</Text>
              <View style={styles.chooseCardContainer}>
                {looserDeck.map((thisCard, index) => loadCard(thisCard, true, index))}
              </View>
              <Button
                title="Go back"
                onPress={() => {
                  console.log(looserDeck[0].id);
                  resetGame();
                  looseCard(looserDeck[0].id);
                  navigation.pop();
                }}
              />
            </View>
          </Modal>
        );
      }

      if (gameOver === 'tie') {
        return (
          <Modal isVisible={visible}>
            <View style={styles.container}>
              <Image
                style={styles.gameOverImage}
                source={Images[gameOver]}
                alt="Cursor"
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                title="Go back"
                onPress={() => {
                  resetGame();
                  changeNPCStreak({ location, npc, streak: 'tie' });
                  navigation.pop();
                }}
              />
            </View>
          </Modal>
        );
      }
    }

    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <Image
            style={styles.gameOverImage}
            source={Images[gameOver]}
            alt="Cursor"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="New random game"
            onPress={() => {
              resetGame();
              navigation.push('GamePlay', { screen: 'GamePlay' });
            }}
          />
          <Button
            title="Back to initial screen"
            onPress={() => {
              resetGame();
              gameMusicStop();
              winThemeStop();
              looseThemeStop();
            }}
          />
        </View>
      </Modal>
    );
  }

  const myTurn = cardsOnTheTable(table) % 2 === 1 ? !turn : turn;

  if (myTurn) {
    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={Images.turn1}
            alt="Cursor"
          />
          <Text style={styles.text}>Player 1!!!</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={Images.turn2}
          alt="Cursor"
        />
        <Text style={styles.text}>Player 2!!!</Text>
      </View>
    </Modal>
  );
};

ModalScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
  turn: PropTypes.bool.isRequired,
  cards: PropTypes.shape({
    play1Cards: PropTypes.arrayOf(PropTypes.object),
    play2Cards: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  rules: PropTypes.objectOf(PropTypes.bool).isRequired,
  gameOver: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  value: PropTypes.string.isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
  npcDeck: PropTypes.bool,
  location: PropTypes.string,
  npc: PropTypes.string,
  playerCards: PropTypes.objectOf(PropTypes.any).isRequired,
  addCardToNPC: PropTypes.func.isRequired,
  removeCardFromNPC: PropTypes.func.isRequired,
  addCardToExploreDeck: PropTypes.func.isRequired,
  removeCardFromExploreDeck: PropTypes.func.isRequired,
  changeNPCStreak: PropTypes.func.isRequired,
};

ModalScreen.defaultProps = {
  npcDeck: null,
  location: null,
  npc: null,
};

export default ModalScreen;
