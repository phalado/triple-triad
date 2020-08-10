import React, { useCallback, useState } from 'react';
import {
  View, Image, Text, Button, TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import RankNumbers from './RankNumbers';
import { getRandomCards, getCardsId, cardsOnTheTable } from '../Helpers/OtherHelpers';
import {
  gameMusicStop, winThemeStop, looseThemeStop, winThemePlay, looseThemePlay, turnCardPlay,
} from '../constants/Sounds';
import Images from '../constants/Images';
import Cards from '../constants/Cards';
import CardModal from './CardModal';
import places from '../constants/Places';
import { rareCardsQuest, cardClubEvents } from '../Helpers/ExploreModeHelper';
import styles from '../styles/GameOverScreen';

const GameOverScreen = props => {
  const {
    navigation, route,
    cards, table, rules, createCard, resetCards, resetTable, playerCards, events, npcs,
    addCardToNPC, removeCardFromNPC, addCardToExploreDeck, removeCardFromExploreDeck,
    changeNPCStreak, changeCardQueenLocation, changeEvent,
  } = props;
  const {
    gameOver, npcDeck, location, npc, p1InitialCards,
  } = route.params;
  const [visible, setVisible] = useState(false);
  const [modalCard, setModalCard] = useState(1);
  const [cardOwner, setCardOwner] = useState('player0');

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

    navigation.goBack(null);
    navigation.push('GamePlay', { screen: 'GamePlay', params: { npcDeck, location, npc } });
  };

  if (rules.sudenDeath && gameOver === 'tie' && cardsOnTheTable(table) === 9) {
    setTimeout(() => sudenDeathGame(), 2000);
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={Images.board} alt="Table" />
        <Image style={styles.gameOverImage} source={Images[gameOver]} alt="Cursor" />
        <Text style={styles.suddenDeathText}>SUDDEN DEATH!!!</Text>
      </View>
    );
  }

  if (npcDeck) {
    const winCard = cardId => {
      if (cardId === 84 || cardId > 77) removeCardFromNPC({ location, npc, card: cardId });
      changeNPCStreak({ location, npc, streak: 'win' });
      setModalCard(cardId);
      addCardToExploreDeck(cardId);
      setCardOwner('player2');
      setVisible(true);
      const myPlace = places.find(p => p[1] === location);
      setTimeout(() => {
        setCardOwner('player1');
        turnCardPlay();
        setTimeout(() => {
          setVisible(false);
          navigation.pop();
          navigation.pop();
          navigation.push('Explore Scenes', {
            place: myPlace[1], image: myPlace[2], play: myPlace[3], stop: myPlace[4],
          });
          cardClubEvents(events, changeEvent, npc, npcs, addCardToNPC);
        }, 1000);
      }, 1000);
    };

    const looseCard = cardId => {
      if (cardId === 48 || cardId > 77) {
        rareCardsQuest(
          removeCardFromNPC, addCardToNPC, location, npc,
          cardId, changeCardQueenLocation, events, changeEvent,
        );
      }
      changeNPCStreak({ location, npc, streak: 'loose' });
      removeCardFromExploreDeck(cardId);
      setModalCard(cardId);
      setCardOwner('player1');
      setVisible(true);
      const myPlace = places.find(p => p[1] === location);
      setTimeout(() => {
        setCardOwner('player2');
        turnCardPlay();
        setTimeout(() => {
          setVisible(false);
          navigation.pop();
          navigation.pop();
          navigation.push('Explore Scenes', {
            place: myPlace[1], image: myPlace[2], play: myPlace[3], stop: myPlace[4],
          });
        }, 1000);
      }, 1000);
    };

    const getCardName = (name, cardId) => {
      let nameStyle = styles.chooseCardNameWhite;
      if (playerCards[cardId] !== undefined) {
        if (playerCards[cardId] === 0) nameStyle = styles.chooseCardNameYellow;
      } else nameStyle = styles.chooseCardNameBlue;
      return <Text style={nameStyle}>{name}</Text>;
    };

    const loadCard = (thisCard, player, index) => {
      const newCard = Cards.find(crd => crd.id === thisCard);
      const thisPlayer = player ? 'player1' : 'player2';
      const thisCardId = thisCard.id || thisCard;
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
          <TouchableOpacity style={styles.chooseCardImage} onPress={() => winCard(thisCardId)}>
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
          <CardModal visible={visible} card={modalCard} table={table} cardOwner={cardOwner} />
          <Image style={styles.backgroundImage} source={Images.board} alt="Table" />
          <Image
            style={styles.gameOverImage}
            source={Images[gameOver]}
            alt="Win image"
          />
          <Text style={styles.text}>Choose one card</Text>
          <View style={styles.chooseCardContainer}>
            {npcDeck.map((thisCard, index) => loadCard(thisCard, false, index))}
          </View>
        </View>
      );
    }

    if (gameOver === 'loose') {
      return (
        <View style={styles.container}>
          <CardModal visible={visible} card={modalCard} table={table} cardOwner={cardOwner} />
          <Image style={styles.backgroundImage} source={Images.board} alt="Table" />
          <Image
            style={styles.gameOverImage}
            source={Images[gameOver]}
            alt="Loose image"
          />
          <Text style={styles.text}>One card will be choosen</Text>
          <View style={styles.chooseCardContainer}>
            {p1InitialCards.map((thisCard, index) => loadCard(thisCard, true, index))}
          </View>
          <Button
            title="Go back"
            onPress={() => {
              looseCard(Math.max(...p1InitialCards));
            }}
          />
        </View>
      );
    }

    if (gameOver === 'tie') {
      return (
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={Images.board} alt="Table" />
          <View style={styles.topContainer}>
            <Image
              style={styles.tieImage}
              source={Images[gameOver]}
              alt="Cursor"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title="Go back"
              onPress={() => {
                const myPlace = places.find(p => p[1] === location);
                changeNPCStreak({ location, npc, streak: 'tie' });
                navigation.pop();
                navigation.push('Explore Scenes', {
                  place: myPlace[1], image: myPlace[2], play: myPlace[3], stop: myPlace[4],
                });
              }}
            />
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={Images.board} alt="Table" />
      <Image style={styles.gameOverImage} source={Images[gameOver]} alt="Cursor" />
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
  rules: PropTypes.objectOf(PropTypes.any).isRequired,
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
  changeCardQueenLocation: PropTypes.func.isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
  events: PropTypes.objectOf(PropTypes.any).isRequired,
  changeEvent: PropTypes.func.isRequired,
  npcs: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default GameOverScreen;
