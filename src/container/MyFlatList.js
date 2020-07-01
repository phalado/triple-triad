import { connect } from 'react-redux';
import FlatList from '../components/MyFlatList';

const mapStateToProps = state => ({
  cards: state.cards,
});

export default connect(mapStateToProps, null)(FlatList);
