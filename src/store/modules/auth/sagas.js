import { takeLatest, call, put, all } from 'redux-saga/effects';
import { singInSuccess } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });
  const { token } = response.data;

  const responseProfile = yield call(api.post, 'profiles', {
    token,
  });
  const user = responseProfile.data;

  yield put(singInSuccess(token, user));
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
