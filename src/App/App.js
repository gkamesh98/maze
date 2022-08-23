/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Background from '../Shared/Background';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Home from '../Screens/Home';
import MyStack from './Routes';
const App = () => {
  return (
    <>
      {/* <View>
        <Text>hello</Text>
        <TouchableOpacity>
          <View>
            <Text>Don't even dare to touch</Text>
          </View>
        </TouchableOpacity>
      </View> */}
      {/* <Background> */}
      <MyStack />
      {/* </Background> */}
      {/* <Home /> */}
    </>
  );
};

export default App;
