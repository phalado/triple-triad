import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { cardWidth, cardHeight, ScreenWidth } = CSSSizes

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
    width: ScreenWidth * 0.18,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  title2: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  cardContainer: {
    position: 'relative',
    width: cardWidth,
    height: cardHeight,
    zIndex: 0,
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
    zIndex: 0,
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
