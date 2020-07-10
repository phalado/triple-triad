import React, { useState } from 'react';
import {
  View, Text, Button, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import ExploreModal from '../container/ExploreModal';
import styles from '../styles/ExploreInitial';

const ExploreInitialScreen = props => {
  const { navigation } = props;
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Coming Soon!</Text>
      <ExploreModal
        visible={visible}
      />
      <Button
        title="New Game"
        onPress={() => {
          Alert.alert('Wait!', 'This will erase your game and start a new one. Are you sure?', [
            {
              text: 'I can\'t just run away.',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Whatever',
              onPress: () => setVisible(true),
            },
          ]);
        }}
      />
      <Button title="Continue" onPress={() => navigation.pop()} />
      <Button title="Go Back" onPress={() => navigation.pop()} />
    </View>
  );
};

ExploreInitialScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreInitialScreen;
