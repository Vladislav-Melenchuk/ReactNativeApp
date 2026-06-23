import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const homeScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 6,
  },
  wrapperLandscape: {
    paddingHorizontal: 28,
  },
  glow: {
    position: 'absolute',
    borderRadius: 999,
  },
  glowTop: {
    width: 240,
    height: 240,
    top: '15%',
    left: -70,
    backgroundColor: colors.glowBlue,
  },
  glowBottom: {
    width: 280,
    height: 280,
    right: -90,
    bottom: '14%',
    backgroundColor: colors.glowViolet,
  },
  card: {
    width: '100%',
    maxWidth: 560,
    paddingHorizontal: 30,
    paddingVertical: 36,
    borderRadius: 32,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#111A57',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.32,
    shadowRadius: 26,
    elevation: 8,
  },
  cardLandscape: {
    maxWidth: 640,
    paddingHorizontal: 42,
    paddingVertical: 32,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
