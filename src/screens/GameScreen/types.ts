import { StackNavigationProp } from '@react-navigation/stack';
import { SCREENS } from '_/router/QuizNavigator';
import { TQuizNavigatorStackParamList } from '_/router/types';

export type TGameScreenProps = {
  navigation: StackNavigationProp<TQuizNavigatorStackParamList, SCREENS.Game>;
};

export type TQuestion = {
  id: number;
  picture: string;
  correctName: string;
  answers: TAnswer[];
};

export type TAnswer = {
  id: number;
  name: string;
  correct: boolean;
};
