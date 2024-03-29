import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenWidth, ScreenHeight } = CSSSizes

const AppStyles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    margin: 0,
    marginTop: '2.5%'
  },
  halfSections: {
    height: ScreenHeight / 2.5,
    width: ScreenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  exploreButton: {
    width: ScreenWidth / 4,
    margin: 10,
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
    borderRadius: 20
  },
  buttonText: {
    fontSize: ScreenWidth /30,
    color: 'white',
    textAlign: 'center'
  },
});

export default AppStyles;
