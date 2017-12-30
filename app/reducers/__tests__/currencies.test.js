import reducer from '../currencies';
import { getInitialConversion } from '../../actions/currencies';

it('sets initial state', () => {
  const actual = reducer(undefined, {});
  expect(actual).toMatchSnapshot();
});

it('sets nested data on initial fetch', () => {
  expect(reducer(undefined, getInitialConversion())).toMatchSnapshot();
});
