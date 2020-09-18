import { StackNavigationProp } from '@react-navigation/stack';
import { QuizNavigatorStackParamList } from '_/router/types';
import { SCREENS } from '_/router/QuizNavigator';

export type HomeScreenProps = {
  navigation: StackNavigationProp<QuizNavigatorStackParamList, SCREENS.Home>;
};
