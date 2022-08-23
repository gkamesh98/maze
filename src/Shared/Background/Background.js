import React from 'react';
import { StyleSheet, View } from 'react-native';

const Background = ({ children }) => {
  return <View style={BackgroundStyleSheet.viewStyle}>{children}</View>;
};

const BackgroundStyleSheet = StyleSheet.create({
  viewStyle: {
    // position: 'absolute',
    // alignSelf: 'stretch',
    // flexGrow: 1,
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
    backgroundColor: 'red',
    // color: 'red',
    // zIndex: 1,
  },
});

export default Background;
