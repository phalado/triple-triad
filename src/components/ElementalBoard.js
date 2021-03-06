import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../constants/Images';
import styles from '../styles/Table';

const ElementalBoard = props => {
  const { table, modifyTable, elemental } = props;
  const elements = ['fire', 'water', 'ice', 'wind', 'poison', 'thunder', 'earth', 'holy'];
  const cardWidth = Dimensions.get('window').width * 0.17;
  const cardHeight = Dimensions.get('window').height * 0.28;

  const getRandomElement = () => {
    let value = Math.floor((1000000 * Math.random()) % 10);
    if (value > 3) return null;
    value = Math.floor(8 * Math.random());
    return elements[value];
  };

  table.forEach((row, i) => row.forEach((column, j) => {
    if (elemental) {
      const element = getRandomElement();
      table[i][j] = [null, null, element];
    }
  }));

  modifyTable(table);


  if (elemental) {
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
  modifyTable: PropTypes.func.isRequired,
  elemental: PropTypes.bool.isRequired,
};

export default ElementalBoard;
