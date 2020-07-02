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
  buttons: {
    flexDirection: 'row',
    height: '65%',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dropZone: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
    marginBottom: 10,
    zIndex: 2,
  },
  playerCardContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  removeClickable: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default GameDeckStyle;
