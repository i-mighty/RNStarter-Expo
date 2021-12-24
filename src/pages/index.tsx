import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@src/pages/Home';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default RootNavigator;
