import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const ChooseDecksScreenStyles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: ScreenHeight / 3,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    height: '65%',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: (2 * ScreenHeight) / 3,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  backImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: ScreenWidth,
    height: ScreenHeight,
    zIndex: -1,
  },
});

export default ChooseDecksScreenStyles;
