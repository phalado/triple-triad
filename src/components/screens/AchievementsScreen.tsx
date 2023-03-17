import React from "react";
import { Button, ScrollView, Text, View } from "react-native";
import AchievementCard from "../AchievementCard";
import AchievementsInterface from "../../interfaces/AchievementsInterface";
import styles from '../../styles/AchievementsScreen'

interface AchievsInterface {
  description: string
  title: string
  status: boolean
}

const AchievementsScreen = (props: { route: any, navigation: any }) => {
  const { achievements, texts } = props.route.params
  const conquered = Object.values(achievements)
    .filter(value => (value as AchievementsInterface).status).length
  const total = Object.keys(achievements).length
  const achievsArray = Object.values(achievements).sort((a: any, b: any) => a.id - b.id)

  return (
    <ScrollView persistentScrollbar>
      <View style={styles.container}>
        <Text style={styles.title}>{texts.achievements + ' - ' + conquered + ' / ' + total}</Text>
        {achievsArray.map((value: AchievsInterface | unknown, index: number) => {
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
        <View style={styles.goBackButton}>
          <Button title={texts.goBack} onPress={() => props.navigation.pop()} />
        </View>
      </View>
    </ScrollView>
  )
}

export default AchievementsScreen;
