import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';

import { singInSuccess, singFailure } from './actions';

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

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(singInSuccess(token, user));
  } catch (error) {
    Alert.alert('Falha na autenticação', 'verifique seus dados');
    yield put(singFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
