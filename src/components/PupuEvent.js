import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/PupuEvents';

const PupuEvent = props => {
  const { getPupuEvent } = props;

  return (
    <TouchableOpacity onPress={() => getPupuEvent()} style={styles.container}>
      <Image
        style={styles.image}
        source={Images.ufo}
        alt="UFO"
      />
    </TouchableOpacity>
  );
};

PupuEvent.propTypes = {
  getPupuEvent: PropTypes.func.isRequired,
};

export default PupuEvent;
