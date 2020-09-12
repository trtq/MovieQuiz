import styled from 'styled-components/native';
import { scale, verticalScale } from 'react-native-size-matters/extend';

export const Ball = styled.View`
  width: ${scale(100)}px;
  height: ${verticalScale(100)}px;
  background-color: red;
`;
