import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { TouchableOpacity } from 'react-native';
import sinon from 'sinon';

import buildStyles from '../../config/styles';
import { ClearButton, styles } from '../Buttons';

beforeAll(() => {
  buildStyles();
});

it('renders successfully', () => {
  const rendered = renderer.create(<ClearButton />).toJSON();
  expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
  expect(typeof styles).toBe('object');
});

it('renders custom text passed via props', () => {
  const rendered = renderer.create(<ClearButton text="hey this is a test" />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('handles a press', () => {
  const callback = sinon.spy();
  const wrapper = shallow(<ClearButton onPress={callback} text="hey this should handle press" />);
  expect(wrapper.find(TouchableOpacity).length).toBe(1);

  wrapper
    .find(TouchableOpacity)
    .first()
    .props()
    .onPress();

  expect(callback.called).toBe(true);
});
