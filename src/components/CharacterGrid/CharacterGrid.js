import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './CharacterGrid.css';
import CharacterCard from '../CharacterCard/CharacterCard';
import PaginationContainer from '../../containers/PaginationContainer';

const CharacterGrid = props => {
  return (
    <Fragment>
      <ul className='character-list'>
        {props.search !== ''
          && props.heroes.length === 0
            && <h3>No results</h3>}

        {props.heroes.map((character, index) => {
          return (
            <CharacterCard
              key={character.id}
              character={character}
              index={index}
              favorites={props.favorites}
              addFavorite={props.addFavorite}
              removeFavorite={props.removeFavorite} />
          )
        })}
      </ul>
      <PaginationContainer />
    </Fragment>
  );
};

CharacterGrid.propTypes = {
  heroes: PropTypes.array.isRequired,
  favorites: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

export default CharacterGrid;
