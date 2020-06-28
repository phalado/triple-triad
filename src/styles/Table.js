import { StyleSheet, Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

const TableStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -Dimensions.get('window').width / 2,
    resizeMode: 'stretch',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  elementalSpot: {
    position: 'absolute',
    width: cardWidth / 2,
    height: cardHeight / 2,
  },
});

export default TableStyles;
