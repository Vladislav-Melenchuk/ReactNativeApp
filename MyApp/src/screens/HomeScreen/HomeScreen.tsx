import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

import { homeScreenStyles } from './HomeScreen.styles';

export function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View
      style={[
        homeScreenStyles.wrapper,
        isLandscape ? homeScreenStyles.wrapperLandscape : null,
      ]}
    >
      <View style={[homeScreenStyles.glow, homeScreenStyles.glowTop]} />
      <View style={[homeScreenStyles.glow, homeScreenStyles.glowBottom]} />
      <View
        style={[
          homeScreenStyles.card,
          isLandscape ? homeScreenStyles.cardLandscape : null,
        ]}
      >
        <Text style={homeScreenStyles.title}>Ласкаво просимо</Text>
        <Text style={homeScreenStyles.text}>
          Ваш простий і зручний калькулятор.
        </Text>
      </View>
    </View>
  );
}
