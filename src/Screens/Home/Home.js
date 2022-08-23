/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { commonStyle } from '../../Shared/CommonStyles';
import CustomButton from '../../Shared/CustomButton';
import CustomModal from '../../Shared/CustomModal';

const Home = ({ navigation }) => {
  const modalRef = useRef();
  return (
    <>
      <View style={commonStyle.centering}>
        <CustomButton
          onPress={() => {
            navigation.navigate('Game');
          }}
          title="Play"
        />
        <CustomButton onPress={modalRef?.current?.open} title="How To play" />
      </View>
      <CustomModal ref={modalRef}>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>How To Play</Text>
            <Text>
              To Escape from the maze you need to start the game at the initial
              point and you have to reach the green spot.
            </Text>
            <Text>
              You should make use the button arrow keys to escape the maze.
            </Text>
          </View>
          <CustomButton
            onPress={modalRef?.current?.close}
            title="close"
            textProps={{ style: { fontSize: 20 } }}
          />
        </View>
      </CustomModal>
    </>
  );
};

export default Home;
