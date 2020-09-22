import { THEME, TThemes } from './types';

export const themes: TThemes = {
  [THEME.Light]: {
    dark: false,
    background: '#f1f1ff',
    textOnBackground: '#010111',
    primary: '#e6e8ff',
    textOnPrimary: '#010111',
    border: '#c9c9ff',
    textOnActiveAnswer: 'white',
    correctAnswer: '#11bd0d',
    incorrectAnswer: '#d10707',
    highScore: '#927b00',
    heartColor: '#d70083',
    crossColor: '#d70000',
    disabled: '#737478',
  },
  [THEME.Dark]: {
    dark: true,
    background: '#00043d',
    textOnBackground: '#f6f6ff',
    primary: '#f6f6ff',
    textOnPrimary: '#010111',
    textOnActiveAnswer: 'white',
    border: '#010111',
    correctAnswer: '#11bd0d',
    incorrectAnswer: '#d10707',
    highScore: 'gold',
    heartColor: '#d70083',
    crossColor: '#d70000',
    disabled: '#737478',
  },
};
