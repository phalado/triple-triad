import React from 'react';
import {
  View, Text, Button, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/GameDrawer';
import { getRandomCards } from '../Helpers/OtherHelpers';

const GameDrawer = props => {
  const {
    rules, createCard, resetCards, resetTable, navigation,
  } = props;

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
        onPress={() => {
          Alert.alert('Wait!', 'If you leave this game will be canceled. Are you sure?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Whatever',
              onPress: () => {
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
                navigation.goBack(null);
              },
            },
          ]);
        }}
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
