import styled from 'styled-components/native';
import { verticalScale } from 'react-native-size-matters/extend';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TThemedProps } from '_/utils/themes';

export const ThemeButtonContainer = styled.TouchableOpacity<TThemedProps<{}>>`
  width: ${verticalScale(30)}px;
  height: ${verticalScale(30)}px;
  justify-content: center;
  align-items: center;
`;

export const ThemeButton = styled(FontAwesome).attrs((props: TThemedProps<{}>) => ({
  name: props.theme.dark ? 'sun-o' : 'moon-o',
  size: verticalScale(27),
  color: props.theme.textOnBackground,
}))``;
