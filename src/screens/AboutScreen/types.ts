import { StackNavigationProp } from '@react-navigation/stack';
import { TQuizNavigatorStackParamList } from '_/router/types';
import { SCREENS } from '_/router/QuizNavigator';

export type TAboutScreenProps = {
  navigation: StackNavigationProp<TQuizNavigatorStackParamList, SCREENS.About>;
};
