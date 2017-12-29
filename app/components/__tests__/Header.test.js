import React from 'react';
import renderer from 'react-test-renderer';

import { Header, styles } from '../Header';

it('renders successfully', () => {
  const rendered = renderer.create(<Header />).toJSON();
  expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
  expect(typeof styles).toBe('object');
});
