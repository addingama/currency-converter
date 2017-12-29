import React from 'react';
import renderer from 'react-test-renderer';

import { LastConverted, styles } from '../Text';

it('renders successfully', () => {
  const rendered = renderer.create(<LastConverted />).toJSON();
  expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
  expect(typeof styles).toBe('object');
});
