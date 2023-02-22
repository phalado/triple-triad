import { connect } from 'react-redux';
import StateInterface from '../../interfaces/StateInterface';
import CatalogScreen from '../screens/CatalogScreen';

const mapStateToProps = (state: StateInterface) => ({
  playerCards: state.playerCards
});

export default connect(mapStateToProps, null)(CatalogScreen);
