import React, { useState } from 'react';
import { View } from 'react-native';

import { BackgroundOrbs } from '../components/BackgroundOrbs/BackgroundOrbs';
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { CalculatorScreen } from '../screens/CalculatorScreen/CalculatorScreen';
import { TabKey } from '../types/calculator';
import { appShellStyles } from './AppShell.styles';

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <View style={appShellStyles.screen}>
      <BackgroundOrbs />
      <View style={appShellStyles.content}>
        <View style={appShellStyles.page}>
          {activeTab === 'home' ? <HomeScreen /> : <CalculatorScreen />}
        </View>

        <NavigationBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </View>
    </View>
  );
}
