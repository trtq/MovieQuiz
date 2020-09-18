import styled from 'styled-components/native';
import { Image } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters/extend';
import { TouchableStandard } from '_/components/TouchableStandard';
import FastImage from 'react-native-fast-image';
import { TThemedProps } from 'App';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${(props: TThemedProps<{}>) => props.theme.background};
`;

export const QuizWrap = styled(Animated.View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const QuestionText = styled.Text`
  font-size: ${scale(24)}px;
  color: ${(props: TThemedProps<{}>) => props.theme.textOnBackground};
  font-weight: 400;
  width: 100%;
  text-align: center;
`;

export const MovieCard = styled.View`
  width: ${scale(358)}px;
  ${/* Not using verticalScale on height because that could mess up the text */ ''}
  height: ${scale(218)}px;
  border-radius: ${scale(8)}px;
  background: ${(props: TThemedProps<{}>) => props.theme.primary};
  border: ${scale(1)}px solid ${(props: TThemedProps<{}>) => props.theme.border};
  justify-content: center;
  align-items: center;
  margin: ${scale(20)}px 0 ${scale(35)}px 0;
  elevation: 5;
  shadow-color: ${(props: TThemedProps<{}>) => props.theme.textOnBackground};
  shadow-opacity: 0.35;
  shadow-radius: 3.84px;
  shadow-offset: 0px 3px;
`;

export const MovieCardImage = styled(FastImage).attrs({
  resizeMode: FastImage.resizeMode.cover,
})`
  width: ${scale(318)}px;
  height: ${scale(179)}px;
  border-radius: ${scale(8)}px;
`;

export const AnswerWrap = styled.TouchableOpacity`
  width: ${scale(358)}px;
  min-height: ${scale(65)}px;
  border-radius: ${scale(8)}px;
  background: ${(props: TThemedProps<{}>) => props.theme.primary};
  border: ${scale(1)}px solid ${(props: TThemedProps<{}>) => props.theme.border};
  justify-content: center;
  align-items: center;
  padding: 0 ${scale(20)}px;
  margin-top: ${scale(15)}px;
  elevation: 5;
  shadow-color: ${(props: TThemedProps<{}>) => props.theme.textOnBackground};
  shadow-opacity: 0.35;
  shadow-radius: 3.84px;
  shadow-offset: 0px 3px;
`;

export const AnswerText = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: ${scale(18)}px;
  color: ${(props: TThemedProps<{}>) => props.theme.textOnPrimary};
  font-weight: 300;
  width: 100%;
  text-align: center;
`;

export const BackgroundImage = styled(Image).attrs((props: TThemedProps<{}>) => ({
  resizeMode: 'repeat',
  source: props.theme.dark
    ? require('assets/images/background-loop.png')
    : require('assets/images/background-loop-light.png'),
}))`
  position: absolute;
  width: 110%;
  height: 110%;
  top: -10%;
  left: -10%;
`;
