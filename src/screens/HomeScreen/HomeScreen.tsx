import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import { MenuButton } from '_/components/MenuButton';
import { SCREENS } from '_/router/QuizNavigator';
import { HomeScreenProps } from './types';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <MenuButton onPress={() => navigation.navigate(SCREENS.Game)}>Start the game</MenuButton>
    </SafeAreaView>
  );
};
