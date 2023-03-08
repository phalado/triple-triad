import React from "react";
import { ScrollView, Text, View } from "react-native";
import AchievementCard from "../AchievementCard";
import AchievementsInterface from "../../interfaces/AchievementsInterface";
import styles from '../../styles/AchievementsScreen'

interface AchievsInterface {
  description: string
  title: string
  status: boolean
}

const AchievementsScreen = (props: { route: any }) => {
  const { achievements, texts } = props.route.params
  const conquered = Object.values(achievements)
    .filter((value: AchievsInterface | unknown) => (value as AchievementsInterface).status).length
  const total = Object.keys(achievements).length

  return (
    <ScrollView persistentScrollbar>
      <View style={styles.container}>
        <Text style={styles.title}>{texts.achievements + ' - ' + conquered + ' / ' + total}</Text>
        {Object.values(achievements).map((value: AchievsInterface | unknown, index: number) => {
          const { status, title, description } = value as AchievsInterface

          return (
            <AchievementCard
              status={status}
              title={title}
              description={description}
              texts={texts}
              key={JSON.stringify([value, index])}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

export default AchievementsScreen;
