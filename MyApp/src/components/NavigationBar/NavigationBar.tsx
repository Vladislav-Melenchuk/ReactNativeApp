import React from 'react';
import { Text, View } from 'react-native';

import { TabKey } from '../../types/app';
import { AnimatedButton } from '../AnimatedButton/AnimatedButton';
import { navigationBarStyles } from './NavigationBar.styles';

type NavigationItem = {
  icon: string;
  key: TabKey;
  label: string;
};

type NavigationBarProps = {
  activeTab: TabKey;
  items: NavigationItem[];
  onChangeTab: (tab: TabKey) => void;
};

export function NavigationBar({
  activeTab,
  items,
  onChangeTab,
}: NavigationBarProps) {
  return (
    <View style={navigationBarStyles.shell}>
      <View style={navigationBarStyles.content}>
      {items.map(item => {
        const isActive = item.key === activeTab;

        return (
          <AnimatedButton
            key={item.key}
            label={item.label}
            onPress={() => onChangeTab(item.key)}
            style={[
              navigationBarStyles.tabButton,
              isActive ? navigationBarStyles.tabButtonActive : null,
            ]}
          >
            <View style={navigationBarStyles.tabInner}>
              <Text
                style={[
                  navigationBarStyles.icon,
                  isActive ? navigationBarStyles.iconActive : null,
                ]}
              >
                {item.icon}
              </Text>
              <Text
                style={[
                  navigationBarStyles.label,
                  isActive ? navigationBarStyles.labelActive : null,
                ]}
              >
                {item.label}
              </Text>
            </View>
          </AnimatedButton>
        );
      })}
      </View>
    </View>
  );
}
