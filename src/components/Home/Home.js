import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import CharacterGrid from '../CharacterGrid/CharacterGrid';

const Home = props => {
  return (
    <div className='container'>
      <input
        id='search'
        placeholder='Search characters'
        type='text'
        value={props.search}
        autoComplete='off'
        onChange={props.handleSearch}
      />

      {props.isFetching
        ? <h3 className='fetching'>{'Fetching data...'}</h3>
        : <Fragment>
            {props.error
              ? <div className='errorMsg'>
                  <h3>Cannot show search results:</h3>
                  <p>{props.error}</p>
                </div>
              : <CharacterGrid
                  search={props.search}
                  heroes={props.heroes}
                  favorites={props.favorites}
                  addFavorite={props.addFavorite}
                  removeFavorite={props.removeFavorite} />}
          </Fragment>
      }
    </div>
  );
}

Home.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  heroes: PropTypes.array.isRequired,
  favorites: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
}

export default Home;
