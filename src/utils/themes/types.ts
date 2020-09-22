import { ThemedStyledProps } from 'styled-components';

export enum THEME {
  Light = 'Light',
  Dark = 'Dark',
}

export type TTheme = {
  dark: boolean;
  background: string;
  textOnBackground: string;
  primary: string;
  textOnPrimary: string;
  textOnActiveAnswer: string;
  border: string;
  correctAnswer: string;
  incorrectAnswer: string;
  highScore: string;
  heartColor: string;
  crossColor: string;
  disabled: string;
};

export type TThemes = {
  [THEME.Light]: TTheme;
  [THEME.Dark]: TTheme;
};

export type TThemedProps<P> = ThemedStyledProps<P, TTheme>;
