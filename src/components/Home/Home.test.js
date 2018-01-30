import React from 'react';
import { mount, shallow } from 'enzyme'
import Home from './Home';

let wrapper;
let props;

function setup() {
  const props = {
    isFetching: true,
    search: '',
    error: '',
    heroes: [],
    favorites: {},
    handleSearch: jest.fn(),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn()
  }

  const wrapper = shallow(<Home {...props} />)

  return {
    props,
    wrapper
  }
}

beforeEach(() => {
  ({ wrapper, props } = setup());

  return  wrapper;
});

describe('<Home /> Component', () => {
  it('should render <Home /> component', () => {
    expect(wrapper.find('div').first().hasClass('container')).toBeTruthy();
  });

  it('should render search input', () => {
    const input = wrapper.find('input');

    expect(input.props().id).toEqual('search');
    expect(input.props().placeholder).toEqual('Search characters');
    expect(input.props().autoComplete).toEqual('off');
    expect(input.props().onChange).toBeDefined();
  });

  it('should call handleSearch on change event', () => {
    const input = wrapper.find('input');

    input.props().onChange();
    expect(props.handleSearch).toHaveBeenCalledTimes(1);
  });

  it('should display Fetching data when props.isFetching is true', () => {

    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.find('h3').hasClass('fetching')).toBeTruthy();
  });

  it('should not display Fetching data when props.isFetching is false', () => {
    wrapper.setProps({ isFetching: false });

    expect(wrapper.find('h3').exists()).toBeFalsy();
  });

  it('should not render <CharacterGrid /> when props.isFetching is true', () => {
    expect(wrapper.find('CharacterGrid').length).toBe(0);
  });

  it('should not render <CharacterGrid /> when props.error is not empty', () => {
    expect(wrapper.find('CharacterGrid').length).toBe(0);
  });

  it('should render error block when props.error is not empty', () => {
    wrapper.setProps({isFetching: false, error: 'Error happened!'});

    expect(wrapper.find('div.errorMsg').exists()).toBeTruthy();
    expect(wrapper.find('div.errorMsg h3').text()).toEqual('Cannot show search results:');
    expect(wrapper.find('div.errorMsg p').text()).toEqual('Error happened!');
  });

  it('should render <CharacterGrid /> when props.error is empty and isFetching is false', () => {
    wrapper.setProps({isFetching: false, error: ''});

    expect(wrapper.find('CharacterGrid').length).toBe(1);
  });

  it('should render <CharacterGrid /> and set needed props', () => {
    wrapper.setProps({isFetching: false, error: ''});

    const expectedProps = [
      'heroes',
      'search',
      'favorites',
      'addFavorite',
      'removeFavorite'
    ];

    props =  Object.keys(wrapper.find('CharacterGrid').props());

    expect(props).toEqual(expect.arrayContaining(expectedProps));
  });
})
