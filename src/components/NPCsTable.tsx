import React from 'react';
import { Button, Text, View } from 'react-native';
import { getNPCsCards } from '../helpers/ExploreModeHelpers';
import styles from '../styles/ExploreScenes';

interface cardInterface {
  cards: number[]
  special: number[]
}

const NPCsTable = (
  props: {
    tableHead: string[],
    tableData: (string | number | { cards: number[]; special: number[]; })[],
    startGame: (cards: number[], row: any) => void,
    texts: { [key: string]: (string | string[]) }
  }
) => {
  const { tableHead, tableData, startGame, texts } = props;

  const generateKey = (npcName: string, value: any, index: number) => {
    return npcName + String(value) + String(index)
  }

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHead}>
        {tableHead.map((value, index) => {
          const textStyle = (index === 0 || index === 4) ? styles.tableText0 : styles.tableText

          return <Text style={textStyle} key={generateKey('', value, index)}>{value}</Text>;
        })}
      </View>
      <View>
        {tableData.map((row: any) => {
          const npcName: string = row[0]

          return (
            <View style={styles.tableHead} key={JSON.stringify(row)}>
              {row.map((value: string | number | cardInterface, index: number) => {
                if (index === 5) return null;
                if (index === 0) {
                  return (
                    <Text style={styles.tableText0} key={generateKey(npcName, value, index)}>
                      {value as string}
                    </Text>
                  )
                }
                if (index < 4) {
                  return (
                    <Text style={styles.tableText} key={generateKey(npcName, value, index)}>
                      {value as number}
                    </Text>
                  )
                }
                return (
                  <Button
                    title={texts.challenge as string}
                    onPress={() => startGame(getNPCsCards((value as cardInterface).cards, (value as cardInterface).special), (row as any)[5])}
                    key={generateKey(npcName, value, index)}
                  />
                );
              }
            )}
          </View>
        )})}
      </View>
    </View>
  );
}

export default NPCsTable
