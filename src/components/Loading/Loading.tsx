import React from 'react';
import Animated, { Clock, Easing, Extrapolate, interpolate, set, useCode } from 'react-native-reanimated';
import { loop, useTimingTransition, useValue } from 'react-native-redash';
import { fadeDuration } from '_/screens/GameScreen';
import { MenuButton } from '_/components/MenuButton';
import { ErrorBlock, ErrorText, LoadingMark } from './layouts';
import { TLoadingProps } from './types';

// a rotating circle that appears when loadup of the new questions takes a while
// on showError===true an error fades in
export const Loading = ({ onAbandon, active, showError }: TLoadingProps) => {
  const opacity = useTimingTransition(active, { duration: fadeDuration });
  const errorOpacity = useTimingTransition(showError, { duration: fadeDuration });
  const animation = useValue(0);
  const clock = new Clock();
  useCode(
    () =>
      set(
        animation,
        loop({
          clock,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          autoStart: true,
        }),
      ),
    [animation],
  );

  const rotate = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [Math.PI * 1.5, Math.PI * 5.5],
    extrapolate: Extrapolate.EXTEND,
  });
  const scale = interpolate(animation, {
    inputRange: [0, 0.5, 1],
    outputRange: [1.5, 1, 1.5],
    extrapolate: Extrapolate.EXTEND,
  });

  return (
    <Animated.View style={{ opacity }}>
      <LoadingMark style={{ transform: [{ rotate }, { scale }] }} />
      <ErrorBlock style={{ opacity: errorOpacity }}>
        <ErrorText>It seems that TMDB can't be reached</ErrorText>
        <MenuButton onPress={onAbandon}>Abandon</MenuButton>
      </ErrorBlock>
    </Animated.View>
  );
};
