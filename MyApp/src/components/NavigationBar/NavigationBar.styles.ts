import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const navigationBarStyles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 10,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    padding: 8,
    borderRadius: 28,
    backgroundColor: colors.navBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    minHeight: 64,
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(45,104,255,0.18)',
  },
  tabInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  icon: {
    color: colors.textMuted,
    fontSize: 18,
    marginBottom: 4,
  },
  iconActive: {
    color: colors.textPrimary,
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  labelActive: {
    color: colors.textPrimary,
  },
});
