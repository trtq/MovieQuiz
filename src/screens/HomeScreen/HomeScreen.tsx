import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import { SCREENS } from '_/router/QuizNavigator';
import { Ball } from './layouts';
import { HomeScreenProps } from './types';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <Ball />
      <Button title="Go to Details" onPress={() => navigation.navigate(SCREENS.Game)} />
    </SafeAreaView>
  );
};
