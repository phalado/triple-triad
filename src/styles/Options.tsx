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
    margin: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginRight: '5%'
  },
  input: {
    color: 'black',
    textAlign: 'center',
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  flag: {
    width: '20%',
    height: '40%'
  },
  flagImage: {
    width: '100%',
    height: '100%'
  }
});

export default OptionsStyles;
