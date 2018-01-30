import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/dom/ajax';

import * as api from '../utils/api';
import * as localStorage from '../utils/localStorage';
import { formatHero } from '../utils/helper';
import * as types from './actionTypes';

// epics
export const searchEpic = action$ =>
  action$.ofType(types.SEARCH, types.GOTO_PAGE)
    .debounceTime(500)
    .mergeMap(action => {
      if (!action.search) {
        return Observable.of({ type: 'SHOW_FAVORITES' });
      }
      return Observable.ajax({
        url: api.createSearchUrl(action.search, action.offset),
        crossDomain: true,
        createXHR: () => {
          return new XMLHttpRequest();
        }
      })
      .map(response => fetchingHeroesSuccess(response.response.data))
      .catch(error => Observable.of(fetchingHeroesError(error.xhr.response)))
    });

export const loadFavoritesEpic = (action$, store) =>
  action$.ofType(types.INIT_APP)
    .mapTo({ type: types.SHOW_FAVORITES });

export const saveFavoritesEpic = (action$, store) => {
  return action$.ofType(types.ADD_FAVORITE, types.REMOVE_FAVORITE)
    .do(state => localStorage.save(store.getState()))
    .ignoreElements();
}

// action creators
export function handleSearch(e) {
  return {
    type: types.SEARCH,
    search: e.target.value
  }
}

export function initApp() {
  return {
    type: types.INIT_APP
  }
}

export function fetchingHeroesError(error) {
  return {
    type: types.FETCHING_HEROES_FAILURE,
    error: 'Error fetching heroes'
  }
}

export function fetchingHeroesSuccess (heroes) {
  return {
    type: types.FETCHING_HEROES_SUCCESS,
    heroes
  }
}

export function addFavorite(hero) {
  return {
    type: types.ADD_FAVORITE,
    hero
  }
}

export function removeFavorite(hero) {
  return {
    type: types.REMOVE_FAVORITE,
    hero
  }
}

export function preloadFavorites(favorites) {
  return {
    type: types.PRELOAD_FAVORITES,
    favorites
  }
}

export function gotoPage(search, offset) {
  return {
    type: types.SEARCH,
    offset,
    search
  }
}

// reducer
const initialState = {
  isFetching: false,
  search: '',
  heroes: [],
  favorites: {},
  favoritesShown: false,
  error: '',
  count: 0,
  total: 0,
  offset: 0
};

export default function heroes(state = initialState, action) {
  switch (action.type) {
    case types.INIT_APP:
      return state;
    case types.SEARCH:
    case types.GOTO_PAGE:
      return {
        ...state,
        isFetching: true,
        search: action.search,
        favoritesShown: false
      }
    case types.FETCHING_HEROES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        heroes: [],
        count: 0,
        total: 0,
        offset: 0
      }
    case types.FETCHING_HEROES_SUCCESS:
      return {
        ...state,
        error: '',
        isFetching: false,
        heroes: action.heroes.results.map(hero => formatHero(hero)),
        count: action.heroes.count,
        total: action.heroes.total,
        offset: action.heroes.offset
      }
    case types.ADD_FAVORITE:
      return {
        ...state,
        favorites: addFavorite(state.favorites, action.hero)
      }
    case types.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: removeFavorite(state.favorites, action.hero)
      }
    case types.PRELOAD_FAVORITES:
      return {
        ...state,
        favorites: action.favorites
      }
    case types.SHOW_FAVORITES:
      const fav = state.favorites || {};
      return {
        ...state,
        isFetching: false,
        favoritesShown: true,
        heroes: Object.values(fav)
      }
    default:
      return state;
  }

  function addFavorite(favorites, hero) {
    const fav = {...favorites};
    fav[hero.id] = hero;

    return fav;
  }
  function removeFavorite(favorites, hero) {
    const fav =  {...favorites};
    delete fav[hero.id];

    return fav;
  }
}
