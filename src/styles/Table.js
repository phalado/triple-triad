import { StyleSheet, Dimensions } from 'react-native';

const TableStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default TableStyles;
