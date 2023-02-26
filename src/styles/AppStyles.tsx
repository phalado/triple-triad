import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenWidth, ScreenHeight } = CSSSizes

const AppStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: ScreenHeight,
    margin: 0,
  },
  halfSections: {
    height: ScreenHeight / 2.5,
    width: ScreenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  exploreButton: {
    width: ScreenWidth / 4,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  exploreButton2: {
    width: ScreenWidth / 4,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  backgroundImages: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: 35,
    color: 'white',
    alignSelf: 'center',
  },
});

export default AppStyles;
