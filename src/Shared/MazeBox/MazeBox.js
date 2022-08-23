import React from 'react';
import { StyleSheet, View } from 'react-native';
import { height, weidth } from '../../constants/dimensions';
import { containerDimensions } from '../MazeContainer';

const MazeBox = ({
  children,
  verticalBorder = true,
  horizontalBorder = true,
  leftBorder = false,
  topBorder = false,
  ...props
}) => {
  const styleMazeBox = StyleSheet.create({
    mazeBoxStyle: {
      minHeight: Math.floor(containerDimensions / height),
      minWidth: Math.floor(containerDimensions / weidth),
      maxWidth: Math.floor(containerDimensions / height),
      maxHeight: Math.floor(containerDimensions / weidth),
      borderColor: 'black',
      borderLeftWidth: leftBorder ? 1 : 0,
      borderTopWidth: topBorder ? 1 : 0,
      borderRightWidth: verticalBorder ? 1 : 0,
      borderBottomWidth: horizontalBorder ? 1 : 0,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={{ ...styleMazeBox.mazeBoxStyle, ...props.style }}>
      {children}
    </View>
  );
};

export default MazeBox;
