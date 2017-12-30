import { getInitialConversion, changeCurrencyAmount } from '../currencies';

it('create a GET_INITIAL_CONVERSION action', () => {
  expect(getInitialConversion()).toMatchSnapshot();
});

it('create a CHANGE_CURRENCY_AMOUNT action', () => {
  expect(changeCurrencyAmount('1000')).toMatchSnapshot();
});
