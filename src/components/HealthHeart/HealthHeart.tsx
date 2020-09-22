import React from 'react';
import { Extrapolate, interpolate } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash';
import { scale, verticalScale } from 'react-native-size-matters/extend';
import { BrokenHeart, Cross, IconContainer, Heart, HeartContainer, heartSize } from './layouts';
import { THealthHeartProps } from './types';

// this is the heart that is used in HealthBar to show remaining health
// i ended up making the transition of losing a heart into a complex and goofy animation that i really like
export const HealthHeart = ({ dead = false }: THealthHeartProps) => {
  const deathProgress = useTimingTransition(dead, { duration: 2000 });

  const shakeStrength = heartSize / 5;

  const heartsX = interpolate(deathProgress, {
    inputRange: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.4, 0.55, 1],
    outputRange: [
      0,
      //shake
      shakeStrength,
      -shakeStrength,
      -shakeStrength,
      shakeStrength,
      0,
      0,
      //fall
      scale(20),
      scale(-10),
    ],
    extrapolate: Extrapolate.CLAMP,
  });

  const heartsY = interpolate(deathProgress, {
    inputRange: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.4, 0.55, 1],
    outputRange: [
      0,
      //shake
      shakeStrength,
      shakeStrength,
      -shakeStrength,
      -shakeStrength,
      0,
      0,
      //fall
      verticalScale(250),
      verticalScale(1000),
    ],
    extrapolate: Extrapolate.CLAMP,
  });

  const heartsRotaton = interpolate(deathProgress, {
    inputRange: [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.4, 0.6, 1],
    outputRange: [0, 0.1, -0.1, -0.2, 0.2, 0, 0, -2, -4],
    extrapolate: Extrapolate.CLAMP,
  });

  const heartOpacity = interpolate(deathProgress, {
    inputRange: [0.18, 0.24],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const brokenHeartOpacity = interpolate(deathProgress, {
    inputRange: [0.18, 0.24],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const crossOpacity = interpolate(deathProgress, {
    inputRange: [0.38, 0.44],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <HeartContainer>
      <IconContainer style={{ transform: [{ translateX: heartsX, translateY: heartsY, rotate: heartsRotaton }] }}>
        <IconContainer style={{ opacity: heartOpacity }}>
          <Heart />
        </IconContainer>
        <IconContainer style={{ opacity: brokenHeartOpacity }}>
          <BrokenHeart />
        </IconContainer>
      </IconContainer>
      <IconContainer style={{ opacity: crossOpacity }}>
        <Cross />
      </IconContainer>
    </HeartContainer>
  );
};
