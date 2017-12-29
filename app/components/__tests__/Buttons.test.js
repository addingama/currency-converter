import React from 'react';
import renderer from 'react-test-renderer';

import { ClearButton, styles } from '../Buttons';

it('renders successfully', () => {
  const rendered = renderer.create(<ClearButton />).toJSON();
  expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
  expect(typeof styles).toBe('object');
});
