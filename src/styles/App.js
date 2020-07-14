import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AppStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: screenHeight,
    margin: 0,
  },
  halfSections: {
    height: screenHeight / 2,
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  exploreButton: {
    width: screenWidth / 3,
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  exploreButton2: {
    width: screenWidth / 4,
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
