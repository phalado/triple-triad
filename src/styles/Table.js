import { StyleSheet, Dimensions } from 'react-native';

const TableStyles = StyleSheet.create({
  container: {
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default TableStyles;
