import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '_/screens/HomeScreen';
import { GameScreen } from '_/screens/GameScreen';
import { DifficultyScreen } from '_/screens/DifficultyScreen';
import { AboutScreen } from '_/screens/AboutScreen';
import { TQuizNavigatorStackParamList } from './types';

const Stack = createStackNavigator<TQuizNavigatorStackParamList>();

export enum SCREENS {
  Home = 'Home',
  Game = 'Game',
  Difficulty = 'Difficulty',
  About = 'About',
}

export const QuizNavigator = () => (
  <Stack.Navigator initialRouteName={SCREENS.Home} headerMode={'none'}>
    <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
    <Stack.Screen name={SCREENS.Game} component={GameScreen} />
    <Stack.Screen name={SCREENS.Difficulty} component={DifficultyScreen} />
    <Stack.Screen name={SCREENS.About} component={AboutScreen} />
  </Stack.Navigator>
);
