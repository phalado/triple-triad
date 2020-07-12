import React, { useCallback, useState } from 'react';
import { View, Image, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import PlacesModal from './PlacesModal';
import styles from '../styles/ExploreScenes';

const ExploreScenes = props => {
  const { navigation, route } = props;
  const { place, play, stop } = route.params;
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      play();

      return () => stop();
    }, []),
  );

  const handleTravel = (place, play, stop) => {
    navigation.pop();
    navigation.push('Explore Scenes', { place, play, stop });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={place} alt="Table" />
      <PlacesModal visible={visible} handleTravel={handleTravel} />
      <Button
        title="Travel"
        onPress={() => setVisible(true)}
      />
      <Button
        title="Edit Deck"
        onPress={() => null}
      />
      <Button
        title="Go Back"
        onPress={() => navigation.pop()}
      />
    </View>
  );
};

ExploreScenes.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreScenes;
