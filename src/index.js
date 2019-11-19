import React from 'react';
import { StatusBar } from 'react-native';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';
import Routes from './routes';

export default function app() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#304352" />
      <Routes />
      <ToastContainer autoClose={3000} />
    </>
  );
}
