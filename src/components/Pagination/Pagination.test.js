import React from 'react';
import { mount, shallow } from 'enzyme'
import Pagination from './Pagination';

let wrapper;
let props;

const mockEvent = { preventDefault: jest.fn()}

function setup() {
  const props = {
    search: '',
    count: 0,
    total: 0,
    offset: 0,
    gotoPage: jest.fn()
  }

  const wrapper = shallow(<Pagination {...props} />)

  return {
    props,
    wrapper
  }
}

beforeEach(() => {
  ({ wrapper, props } = setup());

  return  wrapper;
});

describe('<Pagination /> Component', () => {
  it('should render <Pagination /> component', () => {
    expect(wrapper.find('ul').hasClass('pager')).toBeTruthy();
  });

  it('should have pager block with 5 li elements', () => {
    expect(wrapper.find('ul li').length).toBe(5);
  });

  it('should have span indicating current page and total pages', () => {
    expect(wrapper.find('ul li span').exists()).toBeTruthy();
  });

  it('should correctly display current page/ total page', () => {
    wrapper.setProps({
      count: 15,
      offset: 20,
      total: 55
    });
    expect(wrapper.find('ul li span').text()).toEqual(`Page 2 of 3`);
  });

  it('should have disabled previous and first buttons when on the first page of results', () => {
    wrapper.setProps({
      count: 15,
      offset: 0,
      total: 15
    });

    expect(wrapper.find('ul li a').at(0).hasClass('disabled')).toBeTruthy();
    expect(wrapper.find('ul li a').at(1).hasClass('disabled')).toBeTruthy();
  });

  it('should have disabled next and last buttons when on the last page of results', () => {
    wrapper.setProps({
      count: 15,
      offset: 20,
      total: 35
    });

    expect(wrapper.find('ul li a').at(2).hasClass('disabled')).toBeTruthy();
    expect(wrapper.find('ul li a').at(3).hasClass('disabled')).toBeTruthy();
  });

  it('should go to the previous results page when click on << button', () => {
    wrapper.setProps({
      search: 'Spider',
      count: 15,
      offset: 20,
      total: 35
    });

    wrapper.find('ul li a').at(0).simulate('click', mockEvent);

    expect(props.gotoPage).toHaveBeenCalledWith('Spider', 0);
  });

  it('should go to the first results page when click on Previous page button', () => {
    wrapper.setProps({
      search: 'Spider',
      count: 15,
      offset: 40,
      total: 55
    });


    wrapper.find('ul li a').at(1).simulate('click', mockEvent);

    expect(props.gotoPage).toHaveBeenCalledWith('Spider', 20);
  });

  it('should go to the next results page when click on Next page button', () => {
    wrapper.setProps({
      search: 'Spider',
      count: 15,
      offset: 0,
      total: 55
    });

    wrapper.find('ul li a').at(2).simulate('click', mockEvent);

    expect(props.gotoPage).toHaveBeenCalledWith('Spider', 20);
  });

  it('should go to the last results page when click on >> button', () => {
    wrapper.setProps({
      search: 'Spider',
      count: 15,
      offset: 0,
      total: 75
    });

    wrapper.find('ul li a').at(3).simulate('click', mockEvent);

    expect(props.gotoPage).toHaveBeenCalledWith('Spider', 60);
  });
});
