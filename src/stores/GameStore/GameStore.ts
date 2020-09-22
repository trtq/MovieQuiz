import AsyncStorage from '@react-native-community/async-storage';
import { generateQuestion } from '_/utils/generateQuestion';
import { TQuestion } from '_/screens/GameScreen/types';
import { DIFFICULTIES, DIFFICULTY } from '_/utils/difficulties';
import { THEME } from '_/utils/themes';
import { TGameState } from './types';

export function createGameStore() {
  return {
    gameState: {
      question: null,
      nextQuestion: null,
      difficuty: DIFFICULTY.Normal,
      health: DIFFICULTIES[DIFFICULTY.Normal].health,
      score: 0,
      highScore: 0,
      continuable: false,
      theme: THEME.Dark,
    } as TGameState,

    setQuestion(q: TQuestion | null) {
      this.gameState.question = q;
      this.saveCurrentSettings(true);
    },
    setNextQuestion(q: TQuestion | null) {
      this.gameState.nextQuestion = q;
      this.saveCurrentSettings();
    },
    changeDifficulty(d: DIFFICULTY) {
      this.gameState.difficuty = d;
      this.saveCurrentSettings();
    },
    swapQuestions() {
      this.gameState.question = this.gameState.nextQuestion;
      this.gameState.nextQuestion = null;
      this.saveCurrentSettings();
    },

    recieveDamage() {
      this.gameState.health--;
      this.saveCurrentSettings(true);
    },

    upScore() {
      this.gameState.score++;
      if (this.gameState.score > this.gameState.highScore) this.gameState.highScore = this.gameState.score;
      this.saveCurrentSettings(true);
    },

    swapTheme() {
      this.gameState.theme = this.gameState.theme === THEME.Dark ? THEME.Light : THEME.Dark;
      this.saveCurrentSettings();
    },

    readAndApplySettings() {
      // called in <SettingsProvider />. when the app starts, reads the state from AsyncStorage and pushes it into state
      AsyncStorage.getItem('gameState')
        .then((res) => {
          if (res) this.gameState = JSON.parse(res);
        })
        .catch((e) => {
          console.log('could not read async storage', e);
        });
    },

    saveCurrentSettings(continuableNow?: boolean) {
      // serialises and saves the game state to async storage
      // because we want the ability to continue at any point without explicit saving by the user, this is called a lot
      if (continuableNow) this.gameState.continuable = true;
      const newSettings = JSON.stringify(this.gameState);
      AsyncStorage.setItem('gameState', newSettings).catch((e) => {
        console.log('could not write in async storage', e);
      });
    },

    newGame() {
      // resets all fields that don't save between different games
      this.gameState = {
        question: null,
        nextQuestion: null,
        difficuty: this.gameState.difficuty,
        health: DIFFICULTIES[this.gameState.difficuty].health,
        score: 0,
        highScore: this.gameState.highScore,
        continuable: false,
        theme: this.gameState.theme,
      };
      const newSettings = JSON.stringify(this.gameState);
      AsyncStorage.setItem('gameState', newSettings).catch((e) => {
        console.log('could not write in async storage', e);
      });
    },

    loadTimer: null as NodeJS.Timeout | null,
    aborter: null as AbortController | null,
    numberOfLoads: 0 as number,
    // this is called in <GameScreen /> when the NextQuestion field is empty
    // it calls generateQuestion() and fills the NextQuestion field with results
    // if question field is also empty, it gets filled too.
    // if results are invalid, it increments the numberOfLoads field, which makes <GameScreen /> call it again
    // to clean up the loop there is a cleanUpLoadingQuestions() method below
    loadQuestions(onLoad: () => void) {
      const { question, nextQuestion, difficuty } = this.gameState;
      if (!nextQuestion) {
        let fullLoad: boolean = false;
        this.aborter = new AbortController();
        if (!question) fullLoad = true;
        Promise.all(
          fullLoad ? [generateQuestion(difficuty), generateQuestion(difficuty)] : [generateQuestion(difficuty)],
        )
          .then((values) => {
            if (fullLoad) {
              if (values[0] && values[1] && values[0].id !== values[1].id) {
                this.gameState.question = values[0];
                this.gameState.nextQuestion = values[1];
                this.numberOfLoads = 0;
                this.saveCurrentSettings(true);
                onLoad();
              } else {
                this.loadTimer = setTimeout(() => {
                  this.numberOfLoads++;
                }, 2000);
              }
            } else if (values[0] && values[0].id !== question?.id) {
              this.gameState.nextQuestion = values[0];
              this.numberOfLoads = 0;
              this.saveCurrentSettings(true);
              onLoad();
            } else {
              this.loadTimer = setTimeout(() => {
                this.numberOfLoads++;
              }, 2000);
            }
          })
          .catch(() => {
            if (!(this.aborter && this.aborter.signal.aborted)) {
              this.loadTimer = setTimeout(() => {
                this.numberOfLoads++;
              }, 2000);
            }
          });
      }
    },
    // cleans up the loop above. called in <GameScreen /> on unmounting
    cleanUpLoadingQuestions() {
      if (this.loadTimer) clearTimeout(this.loadTimer);
      if (this.aborter) this.aborter.abort();
    },
  };
}

export type TGameStore = ReturnType<typeof createGameStore>;
