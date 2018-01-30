import reducer, * as actions from './heroes';
import * as types from './actionTypes';
import { formatHero } from '../utils/helper';

const fakeHero = {
  "id": 1009551,
  "name": "Russian",
  "avatar": "http://i.annihil.us/u/prod/marvel/i/mg/8/10/4c003c4af200f.jpg",
  "detailsUrl": "http://marvel.com/characters/1964/russian?utm_campaign=apiRef&utm_source=7f8d60cb47d5550dceace155296625e4"
};

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

jest.mock('../utils/helper', () => ({formatHero: jest.fn()}));
formatHero.mockImplementation(()=> fakeHero);


describe('REDUX >> heroes', () => {
  describe('action creators', () => {
    it('should create an action to handle search', () => {
      const e = {
        target: {
          value: 'Spiderman'
        }
      };

      const expectedAction = {
        type: types.SEARCH,
        search: 'Spiderman'
      }

      expect(actions.handleSearch(e)).toEqual(expectedAction)
    });

    it('should create an action to init app', () => {
      const expectedAction = {
        type: types.INIT_APP
      }

      expect(actions.initApp()).toEqual(expectedAction)
    });

    it('should create an action to report fetching error', () => {
      const expectedAction = {
        type: types.FETCHING_HEROES_FAILURE,
        error: 'Error fetching heroes'
      }

      expect(actions.fetchingHeroesError(expectedAction.error)).toEqual(expectedAction)
    });

    it('should create an action to add heroes to the state', () => {
      const expectedAction = {
        type: types.FETCHING_HEROES_SUCCESS,
        heroes: [fakeHero]
      }

      expect(actions.fetchingHeroesSuccess([fakeHero])).toEqual(expectedAction)
    });

    it('should create an action to add a favorite hero', () => {
      const expectedAction = {
        type: types.ADD_FAVORITE,
        hero: fakeHero
      }

      expect(actions.addFavorite(fakeHero)).toEqual(expectedAction)
    });

    it('should create an action to remove a favorite hero', () => {
      const expectedAction = {
        type: types.REMOVE_FAVORITE,
        hero: fakeHero
      }

      expect(actions.removeFavorite(fakeHero)).toEqual(expectedAction)
    });

    it('should create an action to load favorite characters', () => {
      const expectedAction = {
        type: types.PRELOAD_FAVORITES,
        favorites: { [fakeHero.id]: fakeHero}
      }

      expect(actions.preloadFavorites(expectedAction.favorites)).toEqual(expectedAction)
    });

    it('should create an action to go to a specific result page', () => {
      const expectedAction = {
        type: types.SEARCH,
        offset: 20,
        search: 'x-men'
      }

      expect(actions.gotoPage('x-men', 20)).toEqual(expectedAction)
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle INIT_APP', () => {
      expect(
        reducer(initialState, {
          type: types.INIT_APP
        })
      ).toEqual(initialState);
    });

    it('should handle SEARCH', () => {
      expect(
        reducer(initialState, {
          type: types.SEARCH,
          search: 'Spiderman'
        })
      ).toEqual({...initialState, ...{isFetching: true, search: 'Spiderman', favoritesShown: false}});
    });

    it('should handle GOTO_PAGE', () => {
      expect(
        reducer(initialState, {
          type: types.SEARCH,
          search: 'Spiderman'
        })
      ).toEqual({...initialState, ...{isFetching: true, search: 'Spiderman', favoritesShown: false}});
    });

    it('should handle FETCHING_HEROES_FAILURE', () => {
      expect(
        reducer(initialState, {
          type: types.FETCHING_HEROES_FAILURE,
          error: 'Error fetching heroes'
        })
      ).toEqual({...initialState, error: 'Error fetching heroes'});
    });

    it('should handle FETCHING_HEROES_SUCCESS', () => {
      expect(
        reducer(initialState, {
          type: types.FETCHING_HEROES_SUCCESS,
          heroes: { results: [ fakeHero ], count: 1, total: 1, offset: 0 }
        })
      ).toEqual(
        {...initialState, ...{
          isFetching: false,
          heroes: [ fakeHero ],
          count: 1, total: 1, offset: 0
        }}
      );
    });

    it('should handle ADD_FAVORITE', () => {
      expect(
        reducer(initialState, {
          type: types.ADD_FAVORITE,
          hero: fakeHero
        })
      ).toEqual({...initialState, favorites: { [fakeHero.id]: fakeHero} });
    });

    it('should handle REMOVE_FAVORITE', () => {
      const stateWithFavorites = {...initialState, favorites: { [fakeHero.id]: fakeHero} };
      expect(
        reducer(stateWithFavorites, {
          type: types.REMOVE_FAVORITE,
          hero: fakeHero
        })
      ).toEqual(initialState);
    });

    it('should handle PRELOAD_FAVORITES', () => {
      const favorites = { [fakeHero.id]: fakeHero};
      expect(
        reducer(initialState, {
          type: types.PRELOAD_FAVORITES,
          favorites: favorites
        })
      ).toEqual({...initialState, favorites});
    });
  });
});
