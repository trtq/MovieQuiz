import styled from 'styled-components/native';
import { scale, verticalScale } from 'react-native-size-matters/extend';
import { TThemedProps } from 'App';

export const Button = styled.TouchableOpacity`
  width: ${scale(250)}px;
  height: ${scale(60)}px;
  border-radius: ${scale(8)}px;
  background: ${(props: TThemedProps<{}>) => props.theme.primary};
  border: ${scale(1)}px solid ${(props: TThemedProps<{}>) => props.theme.border};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: ${scale(19)}px;
  color: ${(props: TThemedProps<{}>) => props.theme.textOnPrimary};
  font-weight: 400;
  width: 100%;
  text-align: center;
`;
