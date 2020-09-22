import { ReactNode } from 'react';
import Animated from 'react-native-reanimated';

export type TRaysQuarterProps = {
  rotateFlat: number;
  rotateAnim: Animated.Node<number>;
};

export type TQuizAnswerProps = {
  onResult?: () => void;
  onFinishAnimation?: () => void;
  correct?: boolean;
  children: ReactNode;
  disabled?: boolean;
  onPressOrCancel?: (val: boolean) => void;
};

export type TResultSheenProps = {
  correct?: boolean;
};

export type TContainerProps = {
  priority?: boolean;
};
