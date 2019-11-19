export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function singInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function singUpRequest(username, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { username, email, password },
  };
}

export function singFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function singOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
