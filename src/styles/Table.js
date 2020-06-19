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
  dropZonesContainer: {
    flex: 1,
    position: 'absolute',
    flexWrap: 'wrap',
    left: -Dimensions.get('window').width / 3.9,
    top: Dimensions.get('window').height / 12.4,
    width: cardWidth * 3,
    height: cardHeight * 3,
  },
  dropZones: {
    borderWidth: 2,
    borderColor: 'red',
    position: 'relative',
    width: cardWidth,
    height: cardHeight,
  },

});

export default TableStyles;
