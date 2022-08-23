import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  title,
  onPress,
  touchableOpacityProps,
  viewProps: { style: viewPropsStyle, ...viewProps },
  textProps: { style: textStyleProps, textProps },
  ...props
}) => {
  return (
    <>
      <TouchableOpacity
        style={style.touchableOpacityStyle}
        onPress={onPress}
        {...touchableOpacityProps}>
        <View style={{ ...style.viewStyle, ...viewPropsStyle }} {...viewProps}>
          {React.isValidElement(props.children) ? (
            props.children
          ) : (
            <Text
              style={{ ...style.textStyle, ...textStyleProps }}
              {...textProps}>
              {title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};
CustomButton.defaultProps = {
  title: '',
  onPress: () => {},
  touchableOpacityProps: {},
  viewProps: {},
  textProps: {},
};

const style = StyleSheet.create({
  touchableOpacityStyle: {
    display: 'flex',
  },
  viewStyle: {
    alignSelf: 'center',
    display: 'flex',
    backgroundColor: 'blue',
    margin: 5,
    // borderColor: 'black',
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 20,
    // borderWidth: 5,
  },
  textStyle: {
    // width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 50,
    color: 'white',
    alignContent: 'center',
  },
});
export default CustomButton;
