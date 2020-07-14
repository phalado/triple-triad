import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/ExploreScenes';

const NPCsTable = props => {
  const { tableHead, tableData } = props;

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHead}>
        {tableHead.map(value => <Text style={styles.tableText} key={value}>{value}</Text>)}
      </View>
      <View>
        {tableData.map(row => (
          <View style={styles.tableHead} key={row}>
            {row.map((value, index) => (
              <Text style={styles.tableText} key={[index, value]}>{value}</Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

NPCsTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default NPCsTable;
