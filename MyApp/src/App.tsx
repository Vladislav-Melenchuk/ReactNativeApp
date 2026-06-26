import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { AppShell } from './navigation/AppShell';
import { appStyles } from './styles/appStyles';
import { colors } from './theme/colors';
import './utils/date';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      <SafeAreaView style={appStyles.safeArea}>
        <AppShell />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
