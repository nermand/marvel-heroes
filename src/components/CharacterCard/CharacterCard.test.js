import React from 'react';
import { mount, shallow } from 'enzyme'
import CharacterCard from './CharacterCard';

let wrapper;
let props;

const fakeHero = {
    "id": 1009551,
    "name": "Russian",
    "avatar": "http://i.annihil.us/u/prod/marvel/i/mg/8/10/4c003c4af200f.jpg",
    "detailsUrl": "http://marvel.com/characters/1964/russian?utm_campaign=apiRef&utm_source=7f8d60cb47d5550dceace155296625e4"
};

function setup() {
  const props = {
    character: fakeHero,
    index: 1,
    favorites: {},
    addFavorite: jest.fn(),
    removeFavorite: jest.fn()
  };

  const wrapper = shallow(<CharacterCard {...props} />)

  return {
    props,
    wrapper
  }
}

beforeEach(() => {
  ({ wrapper, props } = setup());

  return  wrapper;
});

describe('<CharacterCard /> Component', () => {
  it('should render <CharacterCard /> component', () => {
    expect(wrapper.find('li').first().hasClass('character-item')).toBeTruthy();
    expect(wrapper.find('li > img').hasClass('avatar')).toBeTruthy();
    expect(wrapper.find('li > img').prop('src')).toEqual(props.character.avatar);
    expect(wrapper.find('li > img').prop('alt')).toEqual(props.character.name + ' avatar');
  });

  it('should render clickable character name linking to the details page', () => {
    expect(wrapper.find('li a').exists()).toBeTruthy();
    expect(wrapper.find('li a').prop('href')).toEqual(props.character.detailsUrl);
    expect(wrapper.find('li a').text()).toEqual(props.character.name);
  });

  it('should display favorite icon that toggle isFavorite flag onClick', () => {
    const icon = wrapper.find('li i');

    expect(icon.prop('onClick')).toBeDefined();
    icon.props().onClick();
    expect(props.addFavorite.mock.calls.length).toBe(1);
    expect(props.removeFavorite.mock.calls.length).toBe(0);
  });

  it('should call removeFavorite onClick when character is set as favorite', () => {
    wrapper.setProps({favorites: {
      [fakeHero.id]: fakeHero
    }});

    const icon = wrapper.find('li i');

    icon.props().onClick();
    expect(props.addFavorite.mock.calls.length).toBe(0);
    expect(props.removeFavorite.mock.calls.length).toBe(1);
  });

  it('should display favorite icon depending on isFavorite flag', () => {
    wrapper.setProps({favorites: {}});
    expect(wrapper.find('li i').hasClass('fa fa-2x fa-star-o')).toBeTruthy();

    wrapper.setProps({favorites: {
      [fakeHero.id]: fakeHero
    }});
    expect(wrapper.find('li i').hasClass('fa fa-2x fa-star')).toBeTruthy();
  });
});
