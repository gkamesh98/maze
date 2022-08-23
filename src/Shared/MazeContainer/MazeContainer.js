/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const {width, height} = Dimensions.get('window');
export const containerDimensions = Math.min(width,height);
const MazeContainer = ({ children, ...props }) => {
  return <View style={style.viewStyle}>
      {children}
  </View>;
};

const style = StyleSheet.create({
    viewStyle: {
        // height: containerDimensions,
        // width: containerDimensions,
        // position: 'absolute',
        maxHeight: containerDimensions,
        maxWidth: containerDimensions,
        // borderWidth: 6,
        // borderColor: 'white',
    },
});

export default MazeContainer;
