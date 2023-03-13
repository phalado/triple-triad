import { StyleSheet } from 'react-native';
import CSSSizes from '../constants/CSSSizes';

const { ScreenWidth, ScreenHeight, TableWidth, cardWidth, cardHeight } = CSSSizes

const OptionsStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '50%',
    height: '80%',
    marginTop: '5%',
    marginLeft: '25%',
  },
  usernameContainer: {
    width: '80%',
    height: '20%',
    margin: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    width: '50%',
    height: '100%',
    color: 'white',
    fontSize: ScreenWidth / 50,
    marginRight: '5%',
    textAlignVertical: 'center'
  },
  input: {
    color: 'black',
    textAlign: 'center',
    width: '50%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center'
  },
  languageButton: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  flag: {
    aspectRatio: 4/3,
    // width: '30%',
    height: '50%',
    alignSelf: 'center'
    // marginTop: '25%'
  },
  flagImage: {
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    width: '40%',
    height: '20%',
    marginLeft: '30%',
    justifyContent: 'center'
  },
});

export default OptionsStyles;
