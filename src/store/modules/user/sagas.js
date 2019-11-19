import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { username, email, ...rest } = payload.data;

    // const profile = {
    //   username, email,
    //   ...(rest.oldPassword ? rest : {}),
    // };

    const profile = {
      username,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    // toast.sucess('Perfil atualizado com sucesso!')

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure());
    // toast.sucess('Erro ao atualizar perfil, confira seus dados!')
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
