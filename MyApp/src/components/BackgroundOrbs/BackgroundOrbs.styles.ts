import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const backgroundOrbStyles = StyleSheet.create({
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbLarge: {
    width: 330,
    height: 330,
    top: -80,
    right: -70,
    backgroundColor: colors.orbPrimary,
  },
  orbMedium: {
    width: 280,
    height: 280,
    left: -90,
    top: 180,
    backgroundColor: colors.orbSecondary,
  },
  orbSmall: {
    width: 220,
    height: 220,
    bottom: 60,
    right: 20,
    backgroundColor: colors.orbTertiary,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.overlay,
  },
});
