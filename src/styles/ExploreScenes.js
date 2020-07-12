import { StyleSheet, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
// const cardWidth = ScreenWidth * 0.17;
// const cardHeight = ScreenHeight * 0.28;

const ExploreScenesStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: ScreenWidth,
    height: ScreenHeight,
  },
});

export default ExploreScenesStyles;
