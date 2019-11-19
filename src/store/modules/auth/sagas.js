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

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const responseProfile = yield call(api.post, 'profiles', {
      token,
    });
    const user = responseProfile.data;

    yield put(singInSuccess(token, user));
  } catch (error) {
    Alert.alert('Falha na autenticação', 'verifique seus dados');
    yield put(singFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { username, email, password } = payload;

    yield call(api.post, 'users', {
      username,
      email,
      password,
    });

    // history.push('/')
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados',
    );
    yield put(singFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
