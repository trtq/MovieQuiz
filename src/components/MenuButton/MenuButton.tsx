import React from 'react';
import { Button, ButtonText } from './layouts';

export const MenuButton = ({ onPress, children }) => {
  return (
    <Button onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};
