import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from '_/stores/StoreProvider';
import { QuizNavigator } from '_/router/QuizNavigator';
import { ThemedStyledProps, ThemeProvider } from 'styled-components';

const darkTheme = {
  dark: true,
  background: '#00043d',
  textOnBackground: '#f6f6ff',
  primary: '#f6f6ff',
  textOnPrimary: '#010111',
  border: '#010111',
};

const lightTheme = {
  dark: false,
  background: '#f1f1ff',
  textOnBackground: '#010111',
  primary: '#e6e8ff',
  textOnPrimary: '#010111',
  border: '#c9c9ff',
};

export type TTheme = typeof darkTheme;
export type TThemedProps<P> = ThemedStyledProps<P, TTheme>;

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <ThemeProvider theme={darkTheme}>
          <QuizNavigator />
        </ThemeProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}
