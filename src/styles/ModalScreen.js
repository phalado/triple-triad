import { StyleSheet, Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width * 0.17;
const cardHeight = Dimensions.get('window').height * 0.28;

const ModalStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: '20%',
    height: '50%',
    resizeMode: 'stretch',
  },
  gameOverImage: {
    width: '50%',
    height: '40%',
    resizeMode: 'stretch',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  newContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    height: '80%',
    margin: '10%',
    backgroundColor: 'white',
  },
  speakingText: {
    fontSize: 20,
    marginHorizontal: '10%',
  },
  cardContainer: {
    position: 'relative',
    width: cardWidth * 2,
    height: cardHeight * 2,
    zIndex: 10,
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
  chooseCardText: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'white',
  },
  chooseCardNameWhite: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
  chooseCardNameBlue: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'blue',
  },
  chooseCardNameYellow: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: 'yellow',
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
});

export default ModalStyles;
