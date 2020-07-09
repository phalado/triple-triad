import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

const ExploreInitialScreen = props => {
  const { navigation } = props;

  return (
    <View>
      <Text>Coming Soon!</Text>
      <Button
        style={{ margin: 20 }}
        title="Go Back"
        onPress={() => navigation.pop()}
      />
    </View>
  );
};

ExploreInitialScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ExploreInitialScreen;
