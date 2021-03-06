import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getNPCsCards } from '../Helpers/ExploreModeHelper';
import styles from '../styles/ExploreScenes';

const NPCsTable = props => {
  const { tableHead, tableData, startGame } = props;

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHead}>
        {tableHead.map((value, index) => {
          if (index === 0 || index === 4) {
            return <Text style={styles.tableText0} key={value}>{value}</Text>;
          }
          return <Text style={styles.tableText} key={value}>{value}</Text>;
        })}
      </View>
      <View>
        {tableData.map(row => (
          <View style={styles.tableHead} key={row}>
            {row.map((value, index) => {
              if (index === 5) return null;
              if (index === 0) {
                return <Text style={styles.tableText0} key={[index, value]}>{value}</Text>;
              }
              if (index < 4) {
                return <Text style={styles.tableText} key={[index, value]}>{value}</Text>;
              }
              return (
                <Button
                  title="Challenge"
                  onPress={() => startGame(getNPCsCards(value.cards, value.special), row[5])}
                  key={[value, index]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

NPCsTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.array).isRequired,
  startGame: PropTypes.func.isRequired,
};

export default NPCsTable;
