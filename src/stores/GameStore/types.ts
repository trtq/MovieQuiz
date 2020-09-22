import { DIFFICULTY } from '_/utils/difficulties';
import { TQuestion } from '_/screens/GameScreen/types';
import { THEME } from '_/utils/themes';

export type TGameState = {
  question: TQuestion | null;
  nextQuestion: TQuestion | null;
  difficuty: DIFFICULTY;
  health: number;
  highScore: number;
  score: number;
  continuable: boolean;
  theme: THEME;
};
