import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const homeScreenStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    gap: 18,
    paddingBottom: 8,
  },
  hero: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  eyebrow: {
    color: colors.accentAmber,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  actionGrid: {
    gap: 12,
  },
  actionCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    minHeight: 104,
  },
  actionAccent: {
    width: 56,
    height: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  actionBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },
  actionText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  actionArrow: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  focusCard: {
    padding: 22,
    borderRadius: 24,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  focusLabel: {
    color: colors.accentAmber,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  focusTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
  },
});
