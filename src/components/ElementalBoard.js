import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/Table';

const ElementalBoard = props => {
  const { table, rules, modifyTable } = props;
  const elements = ['fire', 'water', 'ice', 'wind', 'poison', 'thunder', 'earth', 'holy'];
  const cardWidth = Dimensions.get('window').width * 0.17;
  const cardHeight = Dimensions.get('window').height * 0.28;

  const getRandomElement = () => {
    let value = Math.floor(10 * Math.random());
    if (value < 3) return null;
    value = Math.floor(8 * Math.random());
    return elements[value];
  };

  table.forEach((row, i) => row.forEach((column, j) => {
    if (rules.elemental) {
      const element = getRandomElement();
      table[i][j] = [null, null, element];
    } else table[i][j] = [null, null, null];
  }));

  modifyTable(table);


  if (rules.elemental) {
    return (
      <View>
        {table.map((row, i) => row.map((col, j) => {
          if (table[i][j][2] !== null) {
            const spotStyle = {
              ...styles.elementalSpot,
              bottom: (1 - i) * cardHeight - Dimensions.get('window').height / 2,
              left: (j - 1) * cardWidth,
            };
            return (
              <Image
                style={spotStyle}
                source={Images[table[i][j][2]]}
                alt="Table"
                key={[i, j, table]}
              />
            );
          }
          return null;
        }))}
      </View>
    );
  }

  return null;
};

ElementalBoard.propTypes = {
  table: PropTypes.arrayOf(PropTypes.array).isRequired,
  rules: PropTypes.objectOf(PropTypes.bool).isRequired,
  modifyTable: PropTypes.func.isRequired,
};

export default ElementalBoard;
