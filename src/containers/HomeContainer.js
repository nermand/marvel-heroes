import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/heroes';
import Home from '../components/Home/Home';

export class HomeContainer extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <Fragment>
        {this.props.favoritesShown
            ? Object.keys(this.props.favorites).length > 0
              ? <h2>These are your favorite characters</h2>
              : <h3>You haven't save any favorite yet</h3>
            : ''}
        <Home
          isFetching={this.props.isFetching}
          search={this.props.search}
          error={this.props.error}
          heroes={this.props.heroes}
          handleSearch={this.props.handleSearch}
          favorites={this.props.favorites}
          addFavorite={this.props.addFavorite}
          removeFavorite={this.props.removeFavorite} />
      </Fragment>
    );
  }
}

HomeContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  heroes: PropTypes.array.isRequired,
  favorites: PropTypes.object.isRequired,
  favoritesShown: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => {
  const { isFetching, search, error, heroes, favorites, favoritesShown } = state;

  return {
    isFetching,
    search,
    error,
    heroes,
    favorites,
    favoritesShown
  }
}

export const mapActionsToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomeContainer);
