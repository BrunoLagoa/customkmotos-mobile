import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();

  // const tron = Reactotron.configure({ host: '192.168.0.1'})
  // no console adb reverse tcp:9090 tcp:9090
}
