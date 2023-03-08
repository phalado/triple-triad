import React from "react";
import { Text, View } from "react-native";
import FlipCard from 'react-native-flip-card'
import styles from '../styles/AchievementsScreen'

const AchievementCard = (props: {
  status: boolean, title: string, description: string, texts: { [key: string]: string | string }
}) => {
  const { status, title, description, texts } = props;

  return (
    <View style={styles.cardContainer}>
      <FlipCard
        flipHorizontal={true}
        flipVertical={false}
        friction={6}
        perspective={1000}
        flip={false}
      >
        <View style={status ? styles.cardFront : styles.lockedCardFront}>
          <Text style={styles.texts}>{status ? texts[title] : texts.lockedAchiev}</Text>
        </View>
        <View style={styles.cardBack}>
          <Text style={styles.texts}>{texts[description]}</Text>
        </View>
      </FlipCard>
    </View>
  )
}

export default AchievementCard;
