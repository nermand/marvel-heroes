import React from 'react';
import PropTypes from 'prop-types';
import './CharacterCard.css';

const CharacterCard = props => {
  const isFavorite = !!props.favorites[props.character.id];

  const favoriteClass = isFavorite
    ? 'fa fa-2x fa-star'
    : 'fa fa-2x fa-star-o';
  const favoriteFn = isFavorite
    ? props.removeFavorite
    : props.addFavorite

  return (
    <li className='character-item'>
      <div className='character-rank'>#{props.index + 1}</div>
      <ul>
        <li>
          <img
            className='avatar'
            src={props.character.avatar}
            alt={props.character.name + ' avatar'}
          />
        </li>
        <li>
          <i className={favoriteClass} onClick={(e) => favoriteFn(props.character, e)}></i>
        </li>
        <li>
          <a href={props.character.detailsUrl}>{props.character.name}</a>
        </li>
      </ul>
    </li>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  favorites: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

export default CharacterCard;
