import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { cardWidth, cardHeight } = CSSSizes

const GameOverScreenStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  gameOverImage: {
    width: '50%',
    margin: 0,
    height: '40%',
    resizeMode: 'stretch',
  },
  tieImage: {
    margin: 0,
    height: '40%',
    resizeMode: 'stretch',
  },
  images: {
    height: '50%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
  },
  cardImage: {
    width: cardWidth * 2,
    height: cardHeight * 2,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  placeContainer: {
    margin: '10%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chooseCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  chooseCardNameWhite: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
  },
  chooseCardNameBlue: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'blue',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
  },
  chooseCardNameYellow: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'yellow',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
  },
  chooseCardImage: {
    width: cardWidth,
    height: cardHeight,
    justifyContent: 'space-evenly',
  },
  insideChooseCard: {
    width: cardWidth,
    height: cardHeight,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  buttonsContainer: {
    width: '80%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  suddenDeathText: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    marginTop: '5%',
  },
});

export default GameOverScreenStyles;
