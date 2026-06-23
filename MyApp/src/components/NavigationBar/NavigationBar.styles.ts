import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const navigationBarStyles = StyleSheet.create({
  shell: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderRadius: 26,
    backgroundColor: colors.navBackground,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tabButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tabIdle,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tabButtonActive: {
    backgroundColor: colors.tabActive,
    borderColor: 'rgba(194,207,255,0.42)',
    shadowColor: '#8FA8FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 5,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
  tabTextActive: {
    color: colors.textPrimary,
  },
});
