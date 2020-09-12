import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '_/screens/HomeScreen';
import { GameScreen } from '_/screens/GameScreen';
import { CVScreen } from '_/screens/CVScreen';
import { QuizNavigatorStackParamList } from './types';

const Stack = createStackNavigator<QuizNavigatorStackParamList>();

export enum SCREENS {
  Home = 'Home',
  Game = 'Game',
  CV = 'CV',
}

export const QuizNavigator = () => (
  <Stack.Navigator initialRouteName={SCREENS.Home}>
    <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
    <Stack.Screen name={SCREENS.Game} component={GameScreen} />
    <Stack.Screen name={SCREENS.CV} component={CVScreen} />
  </Stack.Navigator>
);
