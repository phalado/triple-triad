import React, { useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../../constants/Images';
import { cardSound, gameTheme, special } from '../../constants/Sounds';
import { getRandomCards } from '../../helpers/OtherHelpers';
import CardInterface from '../../interfaces/CardInterface';
import styles from '../../styles/AppStyles'
import { Audio } from 'expo-av';
import { GameContext } from '../GameContext';

const InitialScreen = ({
  navigation,
  resetPlayerDeckExplore,
  restartEvents,
  loadSound
}: {
  navigation: any,
  resetPlayerDeckExplore: () => void,
  restartEvents: () => void,
  loadSound: (name: string, sound: any) => void
}) => {
  const { resetTable, createCard } = useContext(GameContext)

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfSections}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Explore', { handleResetDeck })}
          style={styles.exploreButton}
        >
          <Image style={styles.backgroundImages} source={Images.explore} />
          <Text style={styles.buttonText}>Explore Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Catalog', { screen: 'Catalog', params: { deck: 'none', type: 'custom' } })}
          style={styles.exploreButton}
        >
          <Image style={styles.backgroundImages} source={Images.deckScreen} />
          <Text style={styles.buttonText}>Catalog</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InitialScreen
