import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters/extend';
import { TCircularProgressCancelProps } from './types';
import { CircleWrap, Times, TimesWrap } from './layouts';

const size = scale(50);
const circumference = size * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// This is a button that appears for a moment while you already pressed on an answer, but still can cancel the decision
// animated svg circle shows how much time is left until the answer is final
export const CircularProgressCancel = ({ progress }: TCircularProgressCancelProps) => {
  const progressCalculated = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0.15 * Math.PI * size, Math.PI * size],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View>
      <CircleWrap>
        <Svg height={size} width={size}>
          <Circle cx={size / 2} cy={size / 2} r={size / 2 - 4} stroke="lightgrey" strokeWidth="4" fill={'white'} />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            stroke="#009101"
            strokeWidth="4"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={progressCalculated}
          />
        </Svg>
      </CircleWrap>
      <TimesWrap>
        <Times />
      </TimesWrap>
    </View>
  );
};
