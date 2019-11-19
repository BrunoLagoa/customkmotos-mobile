import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { singInSuccess, singFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
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
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(singFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
