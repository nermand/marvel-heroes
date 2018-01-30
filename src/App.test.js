import React from 'react';
import { mount, shallow } from 'enzyme'
import App from './App';

let enzymeWrapper;

function setup() {
  const props = {
    addTodo: jest.fn()
  }

  const enzymeWrapper = shallow(<App {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

beforeEach(() => {
  enzymeWrapper = setup().enzymeWrapper;

  return  enzymeWrapper;
});

describe('<App />', () => {
  it('should render <App /> component', () => {
    expect(enzymeWrapper.find('header').hasClass('App-header')).toBeTruthy();
    expect(enzymeWrapper.find('img').exists()).toBeTruthy();
    expect(enzymeWrapper.find('header h1').text()).toBe('Marvel Characters Search Engine');
  });

  it('should contain <HomeContainer />', () => {
    expect(enzymeWrapper.find('HomeContainer')).toBeTruthy();
  });

  it('should render img tag containing logo \'marvel.svg\'', () => {
    expect(enzymeWrapper.find('header img').exists()).toBeTruthy();
    expect(enzymeWrapper.find('header img').hasClass('App-logo')).toBeTruthy();
    expect(enzymeWrapper.find('header img').prop('src')).toEqual('marvel.svg');
  });

  it('should render img tag with alt text \'logo\'', () => {
    expect(enzymeWrapper.find('header img').prop('alt')).toEqual('logo');
  });
})
