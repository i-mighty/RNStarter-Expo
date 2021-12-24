import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { store } from '@src/stores';
import AppRoot from '@src/containers';

  <Provider store={store}>
    <NavigationContainer>
      <NativeBaseProvider>
        <AppRoot />
      </NativeBaseProvider>
    </NavigationContainer>
  </Provider>
);

export default App;
