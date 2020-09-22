import React, { ReactNode } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { createGameStore, TGameStore } from './GameStore';

export const storeContext = React.createContext<{ gameStore: TGameStore } | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const gameStore = useLocalStore(createGameStore);
  const rootStore = {
    gameStore,
  };
  return <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>;
};
