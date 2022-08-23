/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { height } from '../../constants/dimensions';
import { containerDimensions } from '../MazeContainer';

const MovingBall = () => {
  return <View style={style.view} />;
};

const style = StyleSheet.create({
  view: {
    backgroundColor: 'red',
    color: 'red',
    width: Math.floor(containerDimensions / height)/1.5,
    height: Math.floor(containerDimensions / height)/1.5,
    maxHeight: Math.floor(containerDimensions / height)/1.5,
    maxWidth: Math.floor(containerDimensions / height)/1.5,
    borderRadius: Math.floor(containerDimensions / height) / 2,
  },
});

export default MovingBall;
