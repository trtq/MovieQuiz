import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/useStore';
import { Header } from './layouts';

export const BugsHeader = observer(() => {
  const store = useStore();
  return <Header>{store.gameStore.bugsCount} Bugs!</Header>;
});
