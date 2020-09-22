import React from 'react';
import { SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { MenuButton } from '_/components/MenuButton';
import { SCREENS } from '_/router/QuizNavigator';
import { SwapThemeButton } from '_/components/SwapThemeButton';
import { useStore } from '_/stores/useStore';
import { THomeScreenProps } from './types';
import { BackgroundImage, Container, Logo, ContGameContainer, SafeWrap, ThemeButtonContainer } from './layouts';

export const HomeScreen = observer(({ navigation }: THomeScreenProps) => {
  const {
    gameStore: {
      gameState: { continuable },
    },
  } = useStore();
  return (
    <Container>
      <BackgroundImage />
      <SafeAreaView>
        <SafeWrap>
          <Logo />
          <ContGameContainer>
            <MenuButton disabled={!continuable} onPress={() => navigation.navigate(SCREENS.Game)}>
              Continue
            </MenuButton>
          </ContGameContainer>
          <ContGameContainer>
            <MenuButton onPress={() => navigation.navigate(SCREENS.Difficulty)}>New game</MenuButton>
          </ContGameContainer>
          <MenuButton onPress={() => navigation.navigate(SCREENS.About)}>About</MenuButton>
          <ThemeButtonContainer>
            <SwapThemeButton />
          </ThemeButtonContainer>
        </SafeWrap>
      </SafeAreaView>
    </Container>
  );
});
