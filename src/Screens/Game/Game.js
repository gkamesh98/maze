/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import { height, weidth } from '../../constants/dimensions';
import { commonStyle } from '../../Shared/CommonStyles';
import MazeBox from '../../Shared/MazeBox/MazeBox';
import MazeContainer, {
  containerDimensions,
} from '../../Shared/MazeContainer/MazeContainer';
import MovingBall from '../../Shared/MovingBall/MovingBall';
import { useGenerateHook } from './hooks';
import CustomButton from '../../Shared/CustomButton';
import CustomModal from '../../Shared/CustomModal';

const Game = ({ navigation }) => {
  const ballTransform = useRef(new Animated.ValueXY())?.current;
  const [mazeWalls, generateNewWalls] = useGenerateHook(height, weidth);
  const [ballCoordinates, setBallCoordinate] = useState([0, 0]);
  const modalRef = useRef();
  const { veritcalWall, horizontalWall } = mazeWalls;
  const [isLongPressTop, setLongPressTop] = useState(false);
  const [isLongPressBottom, setLongPressBottom] = useState(false);
  const [isLongPressLeft, setLongPressLeft] = useState(false);
  const [isLongPressRight, setLongPressRight] = useState(false);

  const moveRight = () => {
    setBallCoordinate((ballCoordinatesInSetBall) => {
      if (
        !veritcalWall[ballCoordinatesInSetBall[1]][ballCoordinatesInSetBall[0]]
      ) {
        Animated.spring(ballTransform, {
          toValue: {
            x:
              (ballCoordinatesInSetBall[0] + 1) *
              Math.floor(containerDimensions / weidth),
            y:
              ballCoordinatesInSetBall[1] *
              Math.floor(containerDimensions / height),
          },

          useNativeDriver: true,
        }).start();

        return [ballCoordinatesInSetBall[0] + 1, ballCoordinatesInSetBall[1]];
      }
      return ballCoordinatesInSetBall;
    });
  };
  const moveLeft = () => {
    setBallCoordinate((ballCoordinatesInSetBall) => {
      if (ballCoordinatesInSetBall[0]) {
        if (
          !veritcalWall[ballCoordinatesInSetBall[1]][
            ballCoordinatesInSetBall[0] - 1
          ]
        ) {
          Animated.timing(ballTransform, {
            toValue: {
              x:
                (ballCoordinatesInSetBall[0] - 1) *
                Math.floor(containerDimensions / weidth),
              y:
                ballCoordinatesInSetBall[1] *
                Math.floor(containerDimensions / height),
            },
            duration: 100,
            useNativeDriver: true,
          }).start();
          return [ballCoordinatesInSetBall[0] - 1, ballCoordinatesInSetBall[1]];
        }
      }
      return ballCoordinatesInSetBall;
    });
  };

  const moveTop = () => {
    setBallCoordinate((ballCoordinatesInSetBall) => {
      if (ballCoordinatesInSetBall[1]) {
        if (
          !horizontalWall[ballCoordinatesInSetBall[1] - 1][
            ballCoordinatesInSetBall[0]
          ]
        ) {
          Animated.spring(ballTransform, {
            toValue: {
              x:
                ballCoordinatesInSetBall[0] *
                Math.floor(containerDimensions / weidth),
              y:
                (ballCoordinatesInSetBall[1] - 1) *
                Math.floor(containerDimensions / height),
            },
            useNativeDriver: true,
          }).start();
          return [ballCoordinatesInSetBall[0], ballCoordinatesInSetBall[1] - 1];
        }
      }
      return ballCoordinatesInSetBall;
    });
  };
  const moveBottom = () => {
    setBallCoordinate((ballCoordinatesInSetBall) => {
      if (
        !horizontalWall[ballCoordinatesInSetBall[1]][
          ballCoordinatesInSetBall[0]
        ]
      ) {
        Animated.spring(ballTransform, {
          toValue: {
            x:
              ballCoordinatesInSetBall[0] *
              Math.floor(containerDimensions / weidth),
            y:
              (ballCoordinatesInSetBall[1] + 1) *
              Math.floor(containerDimensions / height),
          },
          useNativeDriver: true,
        }).start();
        return [ballCoordinatesInSetBall[0], ballCoordinatesInSetBall[1] + 1];
      } else {
        return ballCoordinatesInSetBall;
      }
    });
  };

  useEffect(() => {
    if (
      ballCoordinates[0] === height - 1 &&
      ballCoordinates[1] === weidth - 1
    ) {
      if (modalRef?.current) {
        modalRef?.current?.open();
      }
    }
  }, [ballCoordinates, modalRef]);

  const beginNew = useCallback(() => {
    generateNewWalls();
    Animated.timing(ballTransform, {
      toValue: {
        x: 0,
        y: 0,
      },
      duration: 0,
      useNativeDriver: true,
    }).start();
    setBallCoordinate([0, 0]);
  }, [ballTransform, generateNewWalls]);

  let longPressBottomTimeId;
  useEffect(() => {
    if (isLongPressBottom) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      longPressBottomTimeId = setInterval(moveBottom, 100);
      return () => {
        clearInterval(longPressBottomTimeId);
      };
    }
  }, [isLongPressBottom]);

  let longPressTopTimeId;
  useEffect(() => {
    if (isLongPressTop) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      longPressTopTimeId = setInterval(moveTop, 100);
      return () => {
        clearInterval(longPressTopTimeId);
      };
    }
  }, [isLongPressTop]);

  let longPressLeftTimeId;
  useEffect(() => {
    if (isLongPressLeft) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      longPressLeftTimeId = setInterval(moveLeft, 100);
      return () => {
        clearInterval(longPressLeftTimeId);
      };
    }
  }, [isLongPressLeft]);

  let longPressRightTimeId;
  useEffect(() => {
    if (isLongPressRight) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      longPressRightTimeId = setInterval(moveRight, 100);
      return () => {
        clearInterval(longPressRightTimeId);
      };
    }
  }, [isLongPressRight]);

  return (
    <>
      <View style={commonStyle.centering}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <CustomButton
              onPress={() => {
                beginNew();
              }}
              viewProps={{ style: { alignSelf: 'flex-start' } }}>
              <Icon name="refresh" color="white" type="ionicons" />
            </CustomButton>
            <CustomButton
              onPress={() => {
                navigation.navigate('Home');
              }}
              viewProps={{ style: { alignSelf: 'flex-end' } }}>
              <Icon name="home" color="white" type="ionicons" />
            </CustomButton>
          </View>
        </View>

        <MazeContainer>
          {[...Array(height)].map((value, horizontalIndex) => {
            return (
              <View
                key={horizontalIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {[...Array(weidth)].map((value, verticalIndex) => {
                  return (
                    <MazeBox
                      leftBorder={verticalIndex === 0 && horizontalIndex !== 0}
                      topBorder={horizontalIndex === 0}
                      verticalBorder={
                        veritcalWall[horizontalIndex][verticalIndex]
                      }
                      horizontalBorder={
                        horizontalIndex === height - 1 &&
                        verticalIndex === weidth - 1
                          ? false
                          : horizontalWall[horizontalIndex][verticalIndex]
                      }
                      key={verticalIndex}
                      style={{
                        backgroundColor: (() => {
                          if (verticalIndex === 0 && horizontalIndex === 0) {
                            return 'yellow';
                          } else if (
                            verticalIndex === weidth - 1 &&
                            horizontalIndex === height - 1
                          ) {
                            return 'lightgreen';
                          } else {
                            return 'inherit';
                          }
                        })(),
                      }}>
                      {verticalIndex === 0 &&
                      // ballCoordinates[0]
                      horizontalIndex === 0 ? (
                        // ballCoordinates[1]
                        <Animated.View
                          style={{
                            transform: [
                              { translateX: ballTransform.x },
                              { translateY: ballTransform.y },
                            ],
                          }}>
                          <MovingBall />
                        </Animated.View>
                      ) : null}
                    </MazeBox>
                  );
                })}
              </View>
            );
          })}
        </MazeContainer>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 10,
            margin: 0,
          }}>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPressIn={() => {
                  moveLeft();
                  setLongPressLeft(true);
                }}
                onPressOut={() => {
                  setLongPressLeft(false);
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: 'red',
                    borderRadius: 20,
                  }}>
                  <Icon name="arrow-left" />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <View style={{ justifyContent: 'flex-start', padding: 10 }}>
                <TouchableOpacity
                  onPressIn={() => {
                    moveTop();
                    setLongPressTop(true);
                  }}
                  onPressOut={() => {
                    setLongPressTop(false);
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: 20,
                      backgroundColor: 'red',
                      borderRadius: 20,
                    }}>
                    <Icon name="arrow-upward" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: 'flex-end', padding: 10 }}>
                <TouchableOpacity
                  onPressIn={() => {
                    moveBottom();
                    setLongPressBottom(true);
                  }}
                  onPressOut={() => {
                    setLongPressBottom(false);
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: 20,
                      backgroundColor: 'red',
                      borderRadius: 20,
                    }}>
                    <Icon name="arrow-downward" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity
                onPressIn={() => {
                  moveRight();
                  setLongPressRight(true);
                }}
                onPressOut={() => {
                  setLongPressRight(false);
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: 'red',
                    borderRadius: 20,
                  }}>
                  <Icon name="arrow-right" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CustomModal ref={modalRef}>
        <View>
          <Text>You escaped the maze</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <CustomButton
              onPress={() => {
                beginNew();
                if (modalRef?.current) {
                  modalRef?.current?.close();
                }
              }}
              viewProps={{ style: { alignSelf: 'flex-start' } }}>
              <Icon name="refresh" color="white" type="ionicons" />
            </CustomButton>
            <CustomButton
              onPress={() => {
                if (modalRef?.current) {
                  modalRef?.current?.close();
                }
                navigation.navigate('Home');
              }}
              viewProps={{ style: { alignSelf: 'flex-end' } }}>
              <Icon name="home" color="white" type="ionicons" />
            </CustomButton>
          </View>
        </View>
      </CustomModal>
    </>
  );
};

export default Game;
