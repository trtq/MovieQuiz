import React, { useContext, useMemo, useState } from 'react';
import { Path, G } from 'react-native-svg';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  call,
  useCode,
  set,
  cond,
  eq,
  greaterOrEq,
  and,
} from 'react-native-reanimated';
import { useValue, timing as redashTiming, interpolateColor } from 'react-native-redash';
import { ThemeContext } from 'styled-components';
import { CircularProgressCancel } from '_/components/CircularProgressCancel';
import { TTheme } from '_/utils/themes';
import { TQuizAnswerProps } from './types';
import { AnswerWrap, AnswerText, CancelSheen, ResultSheen, RaysSvg, Container } from './layouts';

const AnimatedG = Animated.createAnimatedComponent(G);

// one of the possible answers that appear while playing the game
// on press it shows a <CircularProgressCancel />. While that's active another press will cancel the answer.
// if the answer isn't canceled, an animation showing the correctness of the answer will play out
// feautures a weird svg animation that shows up if the answer is correct
export const QuizAnswer = ({ onResult, onPressOrCancel, correct, children, disabled }: TQuizAnswerProps) => {
  const theme: TTheme = useContext(ThemeContext);

  const [wasPressed, setWasPressed] = useState<number>(0);
  const [wasFullyPressed, setWasFullyPressed] = useState<number>(0);
  const progress = useValue(0);

  //logic that runs the animation
  useCode(
    () =>
      cond(
        eq(wasPressed, 1),
        //this starts the animation on press
        set(progress, redashTiming({ duration: 4500, from: 0, to: 4, easing: Easing.linear })),
        set(progress, 0),
      ),
    [wasPressed],
  );
  useCode(
    () =>
      cond(
        // after the <CircularProgressCancel /> finishes we lock up the button from being pressable
        and(greaterOrEq(progress, 1), eq(wasFullyPressed, 0)),
        call([], () => {
          setWasFullyPressed(1);
          if (onResult) onResult();
        }),
      ),
    [progress, wasFullyPressed],
  );
  const handlePress = () => {
    if (!wasPressed) {
      setWasPressed(1);
      if (onPressOrCancel) onPressOrCancel(true);
    } else if (!wasFullyPressed) {
      setWasPressed(0);
      if (onPressOrCancel) onPressOrCancel(false);
    }
  };

  //interpolations for the animation
  const rotate = interpolate(progress, {
    inputRange: [1.45, 4],
    outputRange: [0, 0.6 * Math.PI],
    extrapolate: Extrapolate.CLAMP,
  });
  const cancelScheenOpacity = interpolate(progress, {
    inputRange: [0, 0.1, 1, 1.05],
    outputRange: [0, 1, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const raysOpacity = interpolate(progress, {
    inputRange: [1.45, 1.8],
    outputRange: [0, 0.7],
    extrapolate: Extrapolate.CLAMP,
  });
  const resultOpacity = interpolate(progress, {
    inputRange: [1.05, 1.35],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textColor = interpolateColor(progress, {
    inputRange: [1.15, 1.35],
    outputRange: [theme.textOnPrimary, theme.textOnActiveAnswer],
  });

  //generating the rays that appear when the answer is correct
  const rays: string[] = useMemo(() => {
    const amount = 9;
    const startLength = 100;
    const endLength = 250;
    const rays = [];
    for (let i = 0; i < 1.5707; i += 1.5707 / amount) {
      rays.push(
        `M ${startLength * Math.cos(i)} ${startLength * Math.sin(i)},
        ${endLength * Math.cos(i)} ${endLength * Math.sin(i)} Z`,
      );
    }
    return rays;
  }, []);

  return (
    <Container priority={!!wasFullyPressed}>
      <AnswerWrap onPress={handlePress} disabled={!wasPressed || wasFullyPressed ? disabled : false}>
        <ResultSheen correct={correct} style={{ opacity: resultOpacity }} />
        {/* the type conflict here is a mistake on redash's part, i think */}
        <AnswerText style={{ color: (textColor as unknown) as Animated.Node<string> }}>{children}</AnswerText>
        <CancelSheen style={{ opacity: cancelScheenOpacity }}>
          <CircularProgressCancel progress={progress} />
        </CancelSheen>
      </AnswerWrap>
      {correct && !!wasFullyPressed && (
        <RaysSvg viewBox="0 0 658 365" style={{ opacity: raysOpacity }}>
          <G origin="329,182" scaleX={1.6} scaleY={0.4}>
            {[0, 90, 180, 270].map((rotation) => (
              <AnimatedG rotation={rotation} key={rotation} x="329" y="182" style={{ transform: [{ rotate }] }}>
                {rays.map((d) => (
                  <Path d={d} key={d + rotation} stroke={theme.textOnBackground} strokeWidth={1} />
                ))}
              </AnimatedG>
            ))}
          </G>
        </RaysSvg>
      )}
    </Container>
  );
};
