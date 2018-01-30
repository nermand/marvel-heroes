import React from 'react';
import { mount, shallow } from 'enzyme'
import { PaginationContainer, mapStateToProps, mapActionsToProps } from './PaginationContainer';

let wrapper;
let props;

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

function setup() {
  const props = {
    search: '',
    error: '',
    count: 10,
    total: 0,
    offset: 0,
    favoritesShown: false,
    gotoPage: jest.fn()
  }

  const wrapper = shallow(<PaginationContainer {...props} />)

  return {
    props,
    wrapper
  }
}

beforeEach(() => {
  ({ wrapper, props } = setup());

  return  wrapper;
});

describe('<PaginationContainer /> Component', () => {
  it('should render <PaginationContainer /> component', () => {
    expect(wrapper.find('Pagination')).toBeTruthy();
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('should render <Pagination /> component with required props', () => {
    const pager = wrapper.find('Pagination');
    const expectedProps = [
      'search',
      'count',
      'total',
      'offset',
      'gotoPage'
    ];

    expect(pager.length).toBe(1);

    props = Object.keys(pager.props());

    expect(props).toEqual(expectedProps);
  });

  it('should not render <Pagination /> when there are no results', () => {
    wrapper.setProps({ count: 0 });
    expect(wrapper.find('Pagination').length).toBe(0);
  });

  it('should not render <Pagination /> when favoritesShown is true', () => {
    wrapper.setProps({ favoritesShown: true });
    expect(wrapper.find('Pagination').length).toBe(0);
  });

  it('should not render <Pagination /> when there is an error', () => {
    wrapper.setProps({ error: 'Some error' });
    expect(wrapper.find('Pagination').length).toBe(0);
  });

  it('should correctly map state to props', () => {
    const props = mapStateToProps(mockState);
    const expectedProps = [
      'search',
      'count',
      'total',
      'offset',
      'error',
      'favoritesShown'
    ];

    expect(Object.keys(props)).toEqual(expect.arrayContaining(expectedProps));
  });

  it('should correctly map state to props', () => {
    const dispatch = jest.fn();
    const props = mapActionsToProps(dispatch);

    const expectedProps = [
      'gotoPage'
    ];
    expect(Object.keys(props)).toEqual(expect.arrayContaining(expectedProps));
  });
})
