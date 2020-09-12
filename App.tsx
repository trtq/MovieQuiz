import 'react-native-gesture-handler';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView, TouchableOpacity, TextInput, View, Text, StyleSheet } from 'react-native';
import { useStore } from './src/stores/useStore';
import { StoreProvider } from './src/stores/StoreProvider';
import { BugsHeader } from './src/components/BugsHeader';
import { QuizNavigator } from './src/router/QuizNavigator';
import { NavigationContainer } from '@react-navigation/native';

const BugsList = observer(() => {
  const store = useStore();

  return (
    <View>
      {store.gameStore.bugs.map((bug) => (
        <Text key={bug}>{bug}</Text>
      ))}
    </View>
  );
});

const BugsForm = () => {
  const store = useStore();
  const [bug, setBug] = React.useState('');

  return (
    <View>
      <TextInput
        value={bug}
        style={{ borderWidth: 1 }}
        onChange={(e) => {
          setBug(e.nativeEvent.text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          store.gameStore.addBug(bug);
          setBug('');
        }}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider>
        <QuizNavigator />
      </StoreProvider>
    </NavigationContainer>
  );
}
