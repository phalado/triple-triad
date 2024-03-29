import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Audio } from 'expo-av';
import { GameContext } from '../GameContext';
import RandomRulesModal from '../modals/RandomRulesModal';
import { getRandomCards } from '../../helpers/OtherHelpers';

import Images from '../../constants/Images';
import { cardSound, gameTheme, special } from '../../constants/Sounds';
import Texts from '../../constants/Texts';

import RulesInterface, { LocalRulesInterface } from '../../interfaces/RulesInterface';
import GameOptionsInterface from '../../interfaces/GameOptionsInterface';
import AchievementsInterface from '../../interfaces/AchievementsInterface';
import styles from '../../styles/AppStyles'


const InitialScreen = ({
  navigation,
  events,
  rules,
  achievements,
  resetPlayerDeckExplore,
  restartAchievements,
  restartEvents,
  loadSound,
  changeEvent,
  changeRandomRules,
  gameOptions
}: {
  navigation: any,
  events: { [event: string]: boolean },
  rules: RulesInterface,
  achievements: AchievementsInterface,
  resetPlayerDeckExplore: () => void,
  restartAchievements: () => void,
  restartEvents: () => void,
  loadSound: (name: string, sound: any) => void,
  changeEvent: (event: string) => void,
  changeRandomRules: (rules: LocalRulesInterface) => void,
  gameOptions: GameOptionsInterface
}) => {
  const { resetTable, createCard, resetCards } = useContext(GameContext)
  const [rulesModal, setRulesModal] = useState(false)
  const language: 'eng' | 'ptbr' = gameOptions.language
  const [texts, setTexts] = useState(Texts[language])

  useEffect(() => setTexts(Texts[language]), [gameOptions.language])

  useEffect(() => {
    resetTable();
    let newCards = getRandomCards();
    newCards.forEach((card: number, index: number) => {
      createCard(true, { id: card, row: 3 + index, column: 3, dragable: true })
    })

    newCards = getRandomCards();
    newCards.forEach((card: number, index: number) => {
      createCard(false, { id: card, row: 3 + index, column: 3, dragable: true })
    })

    Audio.Sound.createAsync(gameTheme).then(({ sound }) => loadSound('gameMusic', sound))
    Audio.Sound.createAsync(cardSound).then(({ sound }) => loadSound('cardSound', sound))
    Audio.Sound.createAsync(special).then(({ sound }) => loadSound('specialSound', sound))
  }, [])

  const handleResetDeck = () => {
    resetPlayerDeckExplore();
    restartEvents();
    changeEvent('newGame')
  };

  const startRandomGame = () => {
    setRulesModal(false)
    const params = { npcDeck: [1, 2, 3, 4, 5], location: 'random', npc: 'Ultimecia' }
    navigation.push('GamePlay', { screen: 'GamePlay', params: params });
  }

  return (
    <View style={styles.container}>
      <View style={styles.halfSections}>
        <RandomRulesModal
          visible={rulesModal}
          setVisible={setRulesModal}
          startRandomGame={startRandomGame}
          randomRules={rules.random}
          changeRandomRules={changeRandomRules}
          texts={texts}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Explore', {
            handleResetDeck, eventNewGame: events.newGame, gameOptions
          })}
          style={styles.exploreButton}
        >
          <Image style={styles.backgroundImages} source={Images.explore} />
          <Text style={styles.buttonText}>{texts.exploreMode}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRulesModal(true)} style={styles.exploreButton}>
          <Image
            style={styles.backgroundImages}
            source={Images.randomGame}
          />
          <Text style={styles.buttonText}>{texts.randomGame}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const params = { npcDeck: [], location: 'choose', npc: '' }
            navigation.navigate('Choose Cards', { screen: 'Choose Cards', params })}
          }
          style={styles.exploreButton2}
        >
          <Image
            style={styles.backgroundImages}
            source={Images.deck}
          />
          <Text style={styles.buttonText}>{texts.editDecks}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Catalog', { screen: 'Catalog', params: { deck: 'none', type: 'custom' } })}
          style={styles.exploreButton}
        >
          <Image style={styles.backgroundImages} source={Images.deckScreen} />
          <Text style={styles.buttonText}>{texts.catalog}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Achievements', { screen: 'Achievements', achievements, texts })}
          style={styles.exploreButton}
        >
          <Image style={styles.backgroundImages} source={Images.ragnarok} />
          <Text style={styles.buttonText}>{texts.achievements}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Options')}
          style={styles.exploreButton}
        >
          <Image style={styles.backgroundImages} source={Images.options} />
          <Text style={styles.buttonText}>{texts.options}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InitialScreen
