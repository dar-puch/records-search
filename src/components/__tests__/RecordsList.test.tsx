import * as React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import { RecordsList } from '../RecordsList';

describe('<RecordsList/>', () => {
  const list = [{ 'id': 1, "title": "Jason", "year": "1989", "catno": "ff45", "cover_image": "hhh" }, { 'id': 2, "title": "Olion", "year": "1955", "catno": "787r", "cover_image": "hhh" }];
  const wrapper = mount(<RecordsList list={list} />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders proper amount of list items', () => {
    expect(wrapper.find("li")).toHaveLength(2);
  });

});
