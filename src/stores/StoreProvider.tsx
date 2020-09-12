import React, { ReactNode } from 'react';
import { createGameStore, TGameStore } from './GameStore';
import { useLocalStore } from 'mobx-react-lite';

export const storeContext = React.createContext<{ gameStore: TGameStore } | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const gameStore = useLocalStore(createGameStore);
  const rootStore = {
    gameStore,
  };
  return <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>;
};
