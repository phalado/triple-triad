import { StyleSheet, Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

const GameDeckStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#c9c2ff',
    paddingBottom: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    width: Dimensions.get('window').width * 0.25,
    height: '45%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  cardContainer: {
    position: 'relative',
    width: cardWidth,
    height: cardHeight,
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    resizeMode: 'stretch',
    position: 'absolute',
  },
});

export default GameDeckStyle;
