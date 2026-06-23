import React from 'react';
import { View } from 'react-native';

import { TabKey } from '../../types/calculator';
import { AnimatedButton } from '../AnimatedButton/AnimatedButton';
import { navigationBarStyles } from './NavigationBar.styles';

type NavigationBarProps = {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
};

export function NavigationBar({
  activeTab,
  onChangeTab,
}: NavigationBarProps) {
  return (
    <View style={navigationBarStyles.shell}>
      <AnimatedButton
        label="Home"
        onPress={() => onChangeTab('home')}
        style={[
          navigationBarStyles.tabButton,
          activeTab === 'home' ? navigationBarStyles.tabButtonActive : null,
        ]}
        textStyle={[
          navigationBarStyles.tabText,
          activeTab === 'home' ? navigationBarStyles.tabTextActive : null,
        ]}
      />
      <AnimatedButton
        label="Калькулятор"
        onPress={() => onChangeTab('calculator')}
        style={[
          navigationBarStyles.tabButton,
          activeTab === 'calculator'
            ? navigationBarStyles.tabButtonActive
            : null,
        ]}
        textStyle={[
          navigationBarStyles.tabText,
          activeTab === 'calculator'
            ? navigationBarStyles.tabTextActive
            : null,
        ]}
      />
    </View>
  );
}
