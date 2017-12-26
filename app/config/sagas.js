import { takeEvery, select, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// 1. swap currency
// 2. change base currency
// 3. upon initial app load

import {
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_ERROR,
  CONVERSION_RESULT,
} from '../actions/currencies';

const getLatestRate = currency => fetch(`http://api.fixer.io/latest?base=${currency}`);

function* fetchLatestConversionRates(action) {
  const { connected, hasCheckedStatus } = yield select(state => state.network);

  if (!connected && hasCheckedStatus) {
    yield put({
      type: CONVERSION_ERROR,
      error: 'Not connected to the internet. Conversion rate may be outdated or unavailable',
    });
    return;
  }
  try {
    let currency = action.currency;
    if (currency === undefined) {
      currency = yield select(state => state.currencies.baseCurrency);
    }

    const response = yield call(getLatestRate, currency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    yield put({ type: CONVERSION_ERROR, error: e.message });
  }
}

function* clearConversionError() {
  const DELAY_SECONDS = 4;
  const error = yield select(state => state.currencies.error);
  if (error) {
    yield delay(DELAY_SECONDS * 1000);
    yield put({ type: CONVERSION_ERROR, error: null });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CONVERSION_ERROR, clearConversionError);
}
