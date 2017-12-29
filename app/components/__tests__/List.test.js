import React from 'react';
import renderer from 'react-test-renderer';

import { Icon, ListItem, Separator, styles } from '../List';

it('renders list item successfully', () => {
  const rendered = renderer.create(<ListItem />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders list item separator successfully', () => {
  const rendered = renderer.create(<Separator />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders list icon successfully', () => {
  const rendered = renderer.create(<Icon />).toJSON();
  expect(rendered).toBeTruthy();
});

it('styles is an object', () => {
  expect(typeof styles).toBe('object');
});
