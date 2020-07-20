import React, { useCallback } from 'react';
import {
  View, Image, Text, Button, TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import RankNumbers from './RankNumbers';
import { getRandomCards, getCardsId } from '../Helpers/OtherHelpers';
import {
  gameMusicStop, winThemeStop, looseThemeStop, winThemePlay, looseThemePlay,
} from '../constants/Sounds';
import Images from '../constants/Images';
import Cards from '../constants/Cards';
import styles from '../styles/ModalScreen';

const GameOverScreen = props => {
  const {
    navigation, route,
    cards, table, rules, createCard, resetCards, resetTable, playerCards,
    addCardToNPC, removeCardFromNPC, addCardToExploreDeck, removeCardFromExploreDeck,
    changeNPCStreak,
  } = props;
  const {
    gameOver, npcDeck, location, npc, p1InitialCards,
  } = route.params;
  console.log(route.params);

  useFocusEffect(
    useCallback(() => {
      if (gameOver === 'win') winThemePlay();
      else if (gameOver === 'loose') looseThemePlay();

      return () => {
        winThemeStop();
        looseThemeStop();
      };
    }, []),
  );

  // const resetGame = () => {
  //   resetTable();
  //   resetCards();

  //   let newCards = getRandomCards();
  //   newCards.forEach((card, index) => {
  //     createCard({
  //       player: true, id: card, row: 3 + index, column: 3, dragable: true,
  //     });
  //   });

  //   newCards = getRandomCards();
  //   newCards.forEach((card, index) => {
  //     createCard({
  //       player: false, id: card, row: 3 + index, column: 3, dragable: true,
  //     });
  //   });

  //   navigation.pop();
  // };

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
    navigation.push('GamePlay', { screen: 'GamePlay', params: { npcDeck, location, npc } });
  };

  if (rules.sudenDeath && gameOver === 'tie') {
    setTimeout(() => sudenDeathGame(), 2000);
    // sudenDeathGame();
    return (
      <View style={styles.container}>
        <Image
          style={styles.gameOverImage}
          source={Images[gameOver]}
          alt="Cursor"
        />
      </View>
    );
  }

  if (npcDeck) {
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
      const newCard = Cards.find(crd => crd.id === thisCard.id || thisCard);
      const thisPlayer = player ? 'player1' : 'player2';
      // resetTable();
      console.log('here');
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
      return (
        <View style={styles.container}>
          <Image
            style={styles.gameOverImage}
            source={Images[gameOver]}
            alt="Win image"
          />
          <Text style={styles.text}>Choose one card</Text>
          <View>
            {npcDeck.map((thisCard, index) => loadCard(thisCard, false, index))}
          </View>
        </View>
      );
    }

    if (gameOver === 'loose') {
      return (
        <View style={styles.container}>
          <Image
            style={styles.gameOverImage}
            source={Images[gameOver]}
            alt="Loose image"
          />
          <Text style={styles.chooseCardText}>One card will be choosen</Text>
          <View style={styles.chooseCardContainer}>
            {p1InitialCards.map((thisCard, index) => loadCard(thisCard, true, index))}
          </View>
          <Button
            title="Go back"
            onPress={() => {
              console.log(p1InitialCards[0].id);
              resetGame();
              looseCard(p1InitialCards[0].id);
              navigation.pop();
            }}
          />
        </View>
      );
    }

    if (gameOver === 'tie') {
      return (
        <View>
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
        </View>
      );
    }
  }

  return (
    <View>
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
    </View>
  );
};

GameOverScreen.propTypes = {
  cards: PropTypes.shape({
    play1Cards: PropTypes.arrayOf(PropTypes.object),
    play2Cards: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  rules: PropTypes.objectOf(PropTypes.bool).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
  playerCards: PropTypes.objectOf(PropTypes.any).isRequired,
  addCardToNPC: PropTypes.func.isRequired,
  removeCardFromNPC: PropTypes.func.isRequired,
  addCardToExploreDeck: PropTypes.func.isRequired,
  removeCardFromExploreDeck: PropTypes.func.isRequired,
  changeNPCStreak: PropTypes.func.isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GameOverScreen;
