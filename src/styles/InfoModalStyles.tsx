import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenHeight, ScreenWidth } = CSSSizes

const InfoModalStyles = StyleSheet.create({
  container: {
    position: 'relative',
    maxHeight: ScreenHeight / 1.9,
    width: ScreenWidth / 2,
    alignSelf: 'center',
    marginTop: ScreenHeight / 5
  },
  backgroundImage: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    top: ScreenHeight / 30,
    left: ScreenWidth / 60,
    color: 'white',
    fontSize: ScreenWidth / 50
  },
  scrollContainer: {
    position: 'absolute',
    top: ScreenHeight / 8,
    left: 0,
    width: '100%',
    height: '60%',
  },
  text: {
    width: '90%',
    left: '5%',
    color: 'white',
    marginBottom: '8%',
    fontSize: ScreenWidth / 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: '5%',
    width: '90%',
    bottom: ScreenHeight / 30,
  }
});

export default InfoModalStyles;
