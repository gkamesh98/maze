import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { pageDef } from '../../Screens/pageDef';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        {pageDef.map((value, index) => (
          <Stack.Screen
            key={index}
            name={value.name}
            component={value.component}
            options={{ title: value.title }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
