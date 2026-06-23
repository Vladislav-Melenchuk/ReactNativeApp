import React from 'react';
import { StyleSheet, View } from 'react-native';

import { backgroundOrbStyles } from './BackgroundOrbs.styles';

export function BackgroundOrbs() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[backgroundOrbStyles.orb, backgroundOrbStyles.orbLarge]} />
      <View style={[backgroundOrbStyles.orb, backgroundOrbStyles.orbMedium]} />
      <View style={[backgroundOrbStyles.orb, backgroundOrbStyles.orbSmall]} />
      <View style={backgroundOrbStyles.overlay} />
    </View>
  );
}
