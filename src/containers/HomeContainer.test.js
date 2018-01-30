import React from 'react';
import { mount, shallow } from 'enzyme'
import { HomeContainer, mapStateToProps, mapActionsToProps } from './HomeContainer';

let wrapper;
let props;

function setup() {
  const props = {
    isFetching: true,
    search: '',
    error: '',
    heroes: [],
    favorites: {},
    favoritesShown: false,
    handleSearch: jest.fn(),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    initApp: jest.fn()
  }

  const wrapper = shallow(<HomeContainer {...props} />);

  return {
    props,
    wrapper
  }
}

const mockState = {
  isFetching: false,
  search: '',
  error: '',
  heroes: [],
  favorites: {},
  favoritesShown: false,
  count: 0,
  total: 0,
  offset: 0
};

beforeEach(() => {
  ({ wrapper, props } = setup())
});

describe('<HomeContainer /> Component', () => {
  it('should render <HomeContainer /> component', () => {
    expect(wrapper.find('div')).toBeTruthy();
    expect(wrapper.find('Home').length).toBe(1);
  });

  it('should display h3 with text \'You haven\'t save any favorite yet\' when there are no saved favorites', () => {
    wrapper.setProps({ favoritesShown: true });

    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.find('h3').text()).toEqual('You haven\'t save any favorite yet');
  });

  it('should display h2 with text \'These are your favorite characters\' when there are saved favorites', () => {
    wrapper.setProps({ favoritesShown: true, favorites: { 1: {}} });

    expect(wrapper.find('h2').exists()).toBeTruthy();
    expect(wrapper.find('h2').text()).toEqual('These are your favorite characters');
  });

  it('should render <Home /> component with required props', () => {
    const home = wrapper.find('Home');
    const expectedProps = [
      'isFetching',
      'search',
      'error',
      'heroes',
      'handleSearch',
      'favorites',
      'addFavorite',
      'removeFavorite'
    ];

    expect(wrapper.find('Home').length).toBe(1);

    props = Object.keys(home.props());

    expect(props).toEqual(expectedProps);
  });

  it('should call initApp when component mounts', () => {
    expect(props.initApp).toHaveBeenCalledTimes(1);
  });

  it('should correctly map state to props', () => {
    const props = mapStateToProps(mockState);
    const expectedProps = [
      'isFetching',
      'search',
      'error',
      'heroes',
      'favorites',
      'favoritesShown'
    ];

    expect(Object.keys(props)).toEqual(expect.arrayContaining(expectedProps));
  });

  it('should correctly map state to props', () => {
    const dispatch = jest.fn();
    const props = mapActionsToProps(dispatch);

    const expectedProps = [
      'handleSearch',
      'addFavorite',
      'removeFavorite'
    ];
    expect(Object.keys(props)).toEqual(expect.arrayContaining(expectedProps));
  });
})
