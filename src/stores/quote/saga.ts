import { fetchQuoteRequest, QuoteResponse } from '@src/services/quote';
import {
  alertError,
  alertMessage,
  setAppLoading,
} from '@src/stores/appNotification/actions';
import { fetchQuoteSuccess } from '@src/stores/quote/actions';
import { QuoteActionTypes } from '@src/stores/quote/types';
import { ApiResponse } from 'apisauce';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

function* fetchQuote() {
  yield put(setAppLoading(true));
  const res: ApiResponse<QuoteResponse> = yield call(fetchQuoteRequest);
  if (res.ok) {
    if (res.data) {
      const value = res.data.contents.quotes[0];
      yield put(fetchQuoteSuccess(value));
    }
    yield put(alertMessage('Your quote is here. Be inspired!'));
  } else {
    yield put(alertError("Couldn't fetch your quote. Kanye is still good"));
  }
  yield put(setAppLoading(false));
}

function* watchFetchQuote() {
  yield takeLatest(QuoteActionTypes.FETCH_QUOTES, fetchQuote);
}

export default function* quoteSaga() {
  yield all([fork(watchFetchQuote)]);
}
