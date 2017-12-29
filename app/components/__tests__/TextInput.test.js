import React from 'react';
import renderer from 'react-test-renderer';

import { InputWithButton, styles } from '../TextInput';

it('renders successfully', () => {
  const rendered = renderer.create(<InputWithButton underlayColor="white" />).toJSON();
  expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
  expect(typeof styles).toBe('object');
});
