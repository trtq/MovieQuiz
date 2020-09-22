import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useTimingTransition } from 'react-native-redash';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react-lite';
import { interpolate, concat } from 'react-native-reanimated';
import { pictureUrlRoot } from '_/utils/ApiAddresses';
import { QuizAnswer } from '_/components/QuizAnswer';
import { Healthbar } from '_/components/HealthBar';
import { Loading } from '_/components/Loading';
import { SCREENS } from '_/router/QuizNavigator';
import { HighScore } from '_/components/HighScore';
import { useStore } from '_/stores/useStore';
import { SwapThemeButton } from '_/components/SwapThemeButton';
import { GoBackButton } from '_/components/GoBackButton';
import { TGameScreenProps } from './types';
import {
  MovieCard,
  QuestionText,
  QuizWrap,
  BackgroundImage,
  MovieCardImage,
  Container,
  HealthbarContainer,
  AnswerTextContainer,
  AnswerText,
  ResultMark,
  LoadingContainer,
  GoBackContainer,
  HighScoreContainer,
  SafeWrap,
  ReplayButtonContainer,
  ReplayButton,
  ThemeButtonContainer,
} from './layouts';

export const fadeDuration = 300;
const answerWaitDuration = 1200;

export const GameScreen = observer(({ navigation }: TGameScreenProps) => {
  const {
    gameStore: {
      gameState: { question, nextQuestion, health },
      setQuestion,
      swapQuestions,
      recieveDamage,
      upScore,
      loadQuestions,
      cleanUpLoadingQuestions,
      newGame,
      numberOfLoads,
    },
  } = useStore();

  //used for fading questions in and out
  const [isShowingQuestion, setIsShowingQuestion] = useState<boolean>(!!question);
  const questionOpacity = useTimingTransition(isShowingQuestion, { duration: fadeDuration });
  //used for showing the loading screen. Additional value for rendering so that it wouldn't run animation constantly
  const [isRenderingLoading, setIsRenderingLoading] = useState<boolean>(!question);
  const [isLoading, setIsLoading] = useState<boolean>(!question);
  const stopLoading = () => {
    if (isLoading) {
      //start fading out and then stop rendering once the animation is done
      setIsLoading(false);
      setTimeout(() => setIsRenderingLoading(false), fadeDuration);
    }
  };
  // used for showing the error behind the loading circle when seveeral attempts to get a question fail
  const [isShowingError, setIsShowingError] = useState<boolean>(false);
  // used for disabling answer buttons once the answer is locked in
  const [isAnswerGiven, setIsAnswerGiven] = useState<boolean>(false);
  // if true substitutes a question for a game over screen
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  // used for animation to show a ⨉ or ✓ mark once the answer is locked
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(false);
  const answerOpacity = useTimingTransition(isShowingAnswer, { duration: fadeDuration });
  const resultMarkRotate = concat(interpolate(answerOpacity, { inputRange: [0.5, 1], outputRange: [-40, -20] }), 'deg');
  const resultMarkOpacity = interpolate(answerOpacity, { inputRange: [0.5, 0.7], outputRange: [0, 1] });
  // depending on this you get ⨉ or ✓ once the answer is locked
  const [wasAnswerCorrect, setWasAnswerCorrect] = useState<boolean>(false);

  // loadQuestions() is used to load up new questions. It happends any time the nextQuestion field is empty
  // if the request throws, store increments numberOfLoads so it's called again
  // cleanUpLoadingQuestions() cleans up the loop on unmounting
  // every operation with local store is to set up a ton of animations that are happening at this point
  useEffect(() => {
    if (!nextQuestion) {
      if (!question) {
        setIsRenderingLoading(true);
        setTimeout(() => setIsLoading(true), 0);
        if (numberOfLoads > 5 && !isShowingError) {
          setIsShowingError(true);
        }
        loadQuestions(() => {
          stopLoading();
          setIsShowingError(false);
          setTimeout(() => setIsShowingQuestion(true), 0); // sending it to the end of the stack to fight the rn-reanimated bug where it jitters on rerender
        });
      } else {
        loadQuestions(() => {
          stopLoading();
          setIsShowingError(false);
        });
      }
      return cleanUpLoadingQuestions;
    }
  }, [nextQuestion, numberOfLoads]);

  // if the question is answerred and faded out the question field becomes null
  // then this is called and it swaps question and nextQuestion fields
  // the question is then rendered and nextQuestion field is now null triggering the above useEffect
  useEffect(() => {
    if (!question && nextQuestion) {
      swapQuestions();
      setTimeout(() => setIsShowingQuestion(true), 0);
    }
  }, [question, nextQuestion]);

  // when the nextQuestion field is filled this preloades the image
  // no need to do this with question field as in all apropriate situations they come from nextQuestion anyway
  useEffect(() => {
    if (nextQuestion) FastImage.preload([{ uri: `${pictureUrlRoot}${nextQuestion.picture}` }]);
  }, [nextQuestion]);

  // triggers when the answer is locked, deals with the results and sets up loading of the new question
  const onAnswer = (correct: boolean) => {
    const savedHealth = health;
    if (!correct) {
      recieveDamage();
    } else {
      upScore();
    }
    setWasAnswerCorrect(correct);
    setIsShowingAnswer(true);
    setTimeout(() => setIsShowingQuestion(false), answerWaitDuration);
    setTimeout(() => {
      setIsAnswerGiven(false);
      setIsShowingAnswer(false);
      setQuestion(null);
      if (!correct && savedHealth <= 1) setIsGameOver(true);
    }, fadeDuration + answerWaitDuration);
  };

  // triggers on the press of a replay button on a game over screen
  // resets animations and triggers newGame() wich resets the state too
  const onRestart = () => {
    setIsShowingQuestion(false);
    setIsRenderingLoading(true);
    setIsShowingAnswer(false);
    setIsAnswerGiven(false);
    setTimeout(() => {
      setIsGameOver(false);
      setIsLoading(true);
      newGame();
    }, fadeDuration);
  };

  return (
    <Container>
      <BackgroundImage />
      {isRenderingLoading && (
        <LoadingContainer>
          <Loading active={isLoading} showError={isShowingError} onAbandon={() => navigation.navigate(SCREENS.Home)} />
        </LoadingContainer>
      )}
      <SafeAreaView>
        <SafeWrap>
          {question && (
            <QuizWrap style={{ opacity: questionOpacity }}>
              {!isGameOver ? (
                <>
                  <QuestionText>What is the name of this movie?</QuestionText>
                  <MovieCard>
                    <MovieCardImage source={{ uri: `${pictureUrlRoot}${question.picture}` }} />
                    <AnswerTextContainer>
                      {isShowingAnswer && (
                        <AnswerText style={{ opacity: answerOpacity }}>{question.correctName}</AnswerText>
                      )}
                    </AnswerTextContainer>
                    <ResultMark
                      correct={wasAnswerCorrect}
                      style={{ opacity: resultMarkOpacity, transform: [{ rotate: resultMarkRotate }] }}
                    />
                  </MovieCard>

                  {question.answers.map((answer) => (
                    <QuizAnswer
                      key={answer.id}
                      onPressOrCancel={setIsAnswerGiven}
                      onResult={() => onAnswer(answer.correct)}
                      correct={answer.correct}
                      disabled={isAnswerGiven}
                    >
                      {answer.name}
                    </QuizAnswer>
                  ))}
                </>
              ) : (
                <>
                  <QuestionText>GAME OVER!</QuestionText>
                  <ReplayButtonContainer onPress={onRestart}>
                    <ReplayButton />
                  </ReplayButtonContainer>
                </>
              )}
            </QuizWrap>
          )}
          <GoBackContainer>
            <GoBackButton onPress={() => navigation.navigate(SCREENS.Home)} />
          </GoBackContainer>
          <HealthbarContainer>
            <Healthbar />
          </HealthbarContainer>
          <HighScoreContainer>
            <HighScore />
          </HighScoreContainer>
          <ThemeButtonContainer>
            <SwapThemeButton />
          </ThemeButtonContainer>
        </SafeWrap>
      </SafeAreaView>
    </Container>
  );
});
