import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from '_/stores/StoreProvider';
import { QuizNavigator } from '_/router/QuizNavigator';
import { SettingsProvider } from '_/components/SettingsProvider';

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <SettingsProvider>
          <QuizNavigator />
        </SettingsProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}
