import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Text } from 'react-native-svg';
import { ThemeProvider } from 'styled-components';
import { useStore } from '_/stores/useStore';
import { themes } from '_/utils/themes';

// a wrapper that reads AsyncStorage info at the point of entrance
// sets up the StatusBar color for androids
// and feeds ThemeProvider with a theme that it gets from the state
export const SettingsProvider = observer(({ children }: { children: React.ReactNode }) => {
  const {
    gameStore: {
      readAndApplySettings,
      gameState: { theme, question },
    },
  } = useStore();

  useEffect(readAndApplySettings, []);
  useEffect(() => {
    if (Platform.OS === 'android') StatusBar.setBackgroundColor(themes[theme].background);
  }, [theme]);

  return (
    <ThemeProvider theme={themes[theme]}>
      {children}
      <Text>{question?.id}</Text>
    </ThemeProvider>
  );
});
