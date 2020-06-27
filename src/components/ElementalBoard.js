import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import rules from '../constants/Rules';
import styles from '../styles/Table';

const ElementalBoard = props => {
  const { table, modifyTable } = props;
  const elements = ['fire', 'water', 'ice', 'wind', 'poison', 'thunder', 'earth', 'holy'];
  const cardWidth = Dimensions.get('window').width * 0.17;
  const cardHeight = Dimensions.get('window').height * 0.28;

  const getRandomElement = () => {
    let value = Math.floor(10 * Math.random());
    if (value < 3) return null;
    value = Math.floor(8 * Math.random());
    return elements[value];
  };

  return (
    <View>
      {table.forEach((row, i) => row.forEach((column, j) => {
        if (rules.elemental) {
          const element = getRandomElement();
          const spotStyle = {
            ...styles.elementalSpot,
            top: (i - 1) * cardHeight,
            right: (j - 1) * cardWidth,
          };
          table[i][j] = [null, null, element];
          return (
            <Image
              style={spotStyle}
              source={Images[element]}
              alt="Table"
            />
          );
        }
        table[i][j] = [null, null, null];
        return null;
      }))}
      {modifyTable(table)}
    </View>
  );
};

ElementalBoard.propTypes = {
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  modifyTable: PropTypes.func.isRequired,
};

export default ElementalBoard;
