import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../../constants/Images';
import { getRandomCards } from '../../helpers/OtherHelpers';
import CardInterface from '../../interfaces/CardInterface';
import styles from '../../styles/AppStyles'

const InitialScreen = ({
  navigation,
  createCard,
  resetTable,
  resetPlayerDeckExplore,
  restartEvents
}: {
  navigation: any,
  createCard: (player: boolean, card: CardInterface) => void,
  resetTable: () => void,
  resetPlayerDeckExplore: () => void,
  restartEvents: () => void
}) => {
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
      </View>
    </View>
  )
}

export default InitialScreen
