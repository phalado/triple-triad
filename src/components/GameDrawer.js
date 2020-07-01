import React from 'react';
import {
  View, Text, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/GameDrawer';
import { resetGame } from '../Helpers/OtherHelpers';

const GameDrawer = props => {
  const {
    rules, createCard, resetCards, resetTable, navigation,
  } = props;

  const giveUpButton = () => resetGame({
    resetCards, resetTable, createCard, navigation,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Hello Stranger!!!</Text>
      <View>
        <Text style={styles.title}>Rules enabled: </Text>
        {Object.entries(rules).map(([key, value]) => {
          if (value) return <Text key={key}>{key}</Text>;
          return null;
        })}
      </View>
      <Button
        style={{ margin: 20 }}
        title="Give up"
        onPress={() => giveUpButton()}
      />
    </View>
  );
};

GameDrawer.propTypes = {
  rules: PropTypes.objectOf(PropTypes.bool).isRequired,
  createCard: PropTypes.func.isRequired,
  resetCards: PropTypes.func.isRequired,
  resetTable: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GameDrawer;
