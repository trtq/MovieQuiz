import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { useTimingTransition } from 'react-native-redash';
import FastImage from 'react-native-fast-image';
import { useCode, call } from 'react-native-reanimated';
import { pictureUrlRoot } from '_/utils/constants';
import { MovieDB_API } from '_/utils/key';
import {
  MovieCard,
  QuestionText,
  QuizWrap,
  AnswerWrap,
  AnswerText,
  BackgroundImage,
  MovieCardImage,
  Container,
} from './layouts';
import { TQuestion } from './types';

const fadeDuration = 1000;

const shuffleArray = (array: unknown[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateQuestion = async () => {
  try {
    const year = 2020 - Math.round(Math.random() * 20);
    const page = 1 + Math.round(Math.random() * 3);
    const moviesResp = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MovieDB_API}&language=en-US&sort_by=vote_count.desc&page=${page}&primary_release_year=${year}&with_original_language=en`,
    );
    const moviesJSON = await moviesResp.json();
    if (moviesJSON && moviesJSON.results) {
      const movie = moviesJSON.results[Math.floor(Math.random() * moviesJSON.results.length)];
      const similarResp = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=ed5a3609078d0ace7b6337f3145fc188&language=en-US&page=1`,
      );
      const similarJSON = await similarResp.json();
      if (similarJSON && similarJSON.results) {
        const result = {
          id: movie.id,
          picture: movie.backdrop_path,
          answers: [{ id: movie.id, name: movie.original_title, correct: true }],
        };
        let similarsCopy = [...similarJSON.results];
        similarsCopy = similarsCopy.slice(0, 8);
        shuffleArray(similarsCopy);
        const similarAnswers = similarsCopy.slice(0, 3);
        for (const similar of similarAnswers) {
          result.answers.push({ id: similar.id, name: similar.original_title, correct: false });
        }
        shuffleArray(result.answers);
        return result;
      } else {
        console.log('couldnt get similar movies', similarJSON);
        throw 'couldnt get similar movies';
      }
    } else {
      console.log('no results', moviesJSON);
      throw 'no results';
    }
  } catch (error) {
    console.error(error);
  }
};

export const GameScreen = () => {
  const [isShowingQuestion, setIsShowingQuestion] = useState<boolean>(false);
  const questionOpacity = useTimingTransition(isShowingQuestion, { duration: fadeDuration });

  const [question, setQuestion] = useState<TQuestion | null>(null);
  const [nextQuestion, setNextQuestion] = useState<TQuestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [numberOfLoads, setNumberOfLoads] = useState<number>(0);

  useEffect(() => {
    if (!nextQuestion) {
      let potentialTimer: NodeJS.Timeout | null;
      let fullLoad: boolean = false;
      const aborter = new AbortController();
      if (!question) {
        setIsLoading(true);
        fullLoad = true;
      }
      Promise.all(fullLoad ? [generateQuestion(), generateQuestion()] : [generateQuestion()])
        .then((values) => {
          if (fullLoad) {
            if (values[0] && values[1] && values[0].id !== values[1].id) {
              setQuestion(values[0]);
              FastImage.preload([{ uri: `${pictureUrlRoot}${values[0].picture}` }]);
              setNextQuestion(values[1]);
              FastImage.preload([{ uri: `${pictureUrlRoot}${values[1].picture}` }]);
              setNumberOfLoads(0);
              setIsLoading(false);
              setIsShowingQuestion(true);
            } else {
              potentialTimer = setTimeout(() => setNumberOfLoads(numberOfLoads + 1), 500);
            }
          } else if (values[0] && values[0].id !== question?.id) {
            setNextQuestion(values[0]);
            setNumberOfLoads(0);
            setIsLoading(false);
            FastImage.preload([{ uri: `${pictureUrlRoot}${values[0].picture}` }]);
          } else {
            potentialTimer = setTimeout(() => setNumberOfLoads(numberOfLoads + 1), 1000);
          }
        })
        .catch(() => {
          if (!aborter.signal.aborted) {
            potentialTimer = setTimeout(() => setNumberOfLoads(numberOfLoads + 1), 1000);
          }
        });
      return () => {
        if (potentialTimer) clearTimeout(potentialTimer);
        aborter.abort();
      };
    }
  }, [nextQuestion, numberOfLoads]);

  useEffect(() => {
    if (!question && nextQuestion) {
      setQuestion(nextQuestion);
      setNextQuestion(null);
      setTimeout(() => setIsShowingQuestion(true), 0); // sending it to the end of the stack to fight the rn-reanimated bug where it jitters on rerender
    }
  }, [question, nextQuestion]);

  const changeQuestion = () => {
    setIsShowingQuestion(false);
    setTimeout(() => setQuestion(null), fadeDuration);
  };

  return (
    <Container>
      <BackgroundImage />
      <SafeAreaView>
        {question && (
          <QuizWrap style={{ opacity: questionOpacity }}>
            <QuestionText>What is the name of this movie?</QuestionText>
            <MovieCard>
              <MovieCardImage source={{ uri: `${pictureUrlRoot}${question.picture}` }} />
            </MovieCard>
            {question.answers.map((answer) => (
              <AnswerWrap key={answer.id} onPress={changeQuestion}>
                <AnswerText>{answer.name}</AnswerText>
              </AnswerWrap>
            ))}
          </QuizWrap>
        )}
      </SafeAreaView>
    </Container>
  );
};
