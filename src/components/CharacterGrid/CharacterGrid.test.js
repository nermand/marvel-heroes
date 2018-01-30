import React from 'react';
import { mount, shallow } from 'enzyme'
import CharacterGrid from './CharacterGrid';

let wrapper;
let props;

const fakeHeroes = [
  {
    "id": 1009551,
    "name": "Russian",
    "avatar": "http://i.annihil.us/u/prod/marvel/i/mg/8/10/4c003c4af200f.jpg",
    "detailsUrl": "http://marvel.com/characters/1964/russian?utm_campaign=apiRef&utm_source=7f8d60cb47d5550dceace155296625e4"
  },
  {
    "id": 1009610,
    "name": "Spider-Man",
    "avatar": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
    "detailsUrl": "http://marvel.com/characters/54/spider-man?utm_campaign=apiRef&utm_source=7f8d60cb47d5550dceace155296625e4"
  }
];

function setup() {
  const props = {
    heroes: [],
    favorites: {},
    addFavorite: jest.fn(),
    removeFavorite: jest.fn()
  }

  const wrapper = shallow(<CharacterGrid {...props} />)

  return {
    props,
    wrapper
  }
}

beforeEach(() => {
  ({ wrapper, props } = setup());

  return  wrapper;
});

describe('<CharacterGrid /> Component', () => {
  it('should render <CharacterGrid /> component', () => {
    expect(wrapper.find('ul').hasClass('character-list')).toBeTruthy();
  });

  it('should have <PaginationContainer /> component', () => {
    expect(wrapper.find('Connect(PaginationContainer)').length).toBe(1);
  });

  it('should display No results in h3 tag when there are no heroes', () => {
    expect(wrapper.find('ul > h3').exists()).toBe(true);
    expect(wrapper.find('ul > h3').text()).toEqual('No results');
  });

  it('should not render <CharacterCard /> when there are no heroes', () => {
    expect(wrapper.find('CharacterCard').exists()).toBe(false);
  });

  it('should render <CharacterCard /> for every hero provided with props', () => {
    wrapper.setProps({
      heroes: fakeHeroes
    });

    const cards = wrapper.find('CharacterCard');
    expect(cards.length).toBe(2);
    expect(+(cards.at(0).key())).toBe(fakeHeroes[0].id);
  });

  it('should render <CharacterCard /> and set needed props', () => {
    wrapper.setProps({
      heroes: fakeHeroes
    });

    const expectedProps = [ 'character', 'index', 'favorites', 'addFavorite', 'removeFavorite' ];

    props =  Object.keys(wrapper.find('CharacterCard').first().props());

    expect(props).toEqual(expectedProps);
  });
});
