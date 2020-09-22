import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { GoBackButton } from '_/components/GoBackButton';
import { MenuButton } from '_/components/MenuButton';
import { SwapThemeButton } from '_/components/SwapThemeButton';
import { SCREENS } from '_/router/QuizNavigator';
import { useStore } from '_/stores/useStore';
import { DIFFICULTY } from '_/utils/difficulties';
import { ButtonWrap, Container, GoBackContainer, SafeWrap, ThemeButtonContainer, TitleText } from './layouts';
import { TDifficultyScreenProps } from './types';

export const DifficultyScreen = observer(({ navigation }: TDifficultyScreenProps) => {
  const {
    gameStore: { changeDifficulty, newGame },
  } = useStore();

  const onPress = (d: DIFFICULTY) => {
    changeDifficulty(d);
    newGame();
    navigation.navigate(SCREENS.Game);
  };

  return (
    <Container>
      <SafeAreaView>
        <SafeWrap>
          <GoBackContainer>
            <GoBackButton onPress={() => navigation.pop()} />
          </GoBackContainer>
          <TitleText>Select difficulty</TitleText>
          <ButtonWrap>
            <MenuButton onPress={() => onPress(DIFFICULTY.Easy)}>Easy</MenuButton>
          </ButtonWrap>
          <ButtonWrap>
            <MenuButton onPress={() => onPress(DIFFICULTY.Normal)}>Normal</MenuButton>
          </ButtonWrap>
          <ButtonWrap>
            <MenuButton onPress={() => onPress(DIFFICULTY.Hard)}>Hard</MenuButton>
          </ButtonWrap>
          <ThemeButtonContainer>
            <SwapThemeButton />
          </ThemeButtonContainer>
        </SafeWrap>
      </SafeAreaView>
    </Container>
  );
});
