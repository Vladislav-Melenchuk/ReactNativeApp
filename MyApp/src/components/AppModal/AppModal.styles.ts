import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const appModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  message: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  details: {
    marginTop: 14,
    gap: 8,
  },
  detailItem: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  actionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 22,
  },
  actionButton: {
    minHeight: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  actionButtonInline: {
    flex: 1,
  },
  actionButtonWrapped: {
    width: '47.5%',
  },
  actionPrimary: {
    backgroundColor: colors.tabActive,
    borderColor: 'rgba(194,214,255,0.34)',
  },
  actionSecondary: {
    backgroundColor: colors.buttonSecondary,
    borderColor: colors.cardBorder,
  },
  actionDanger: {
    backgroundColor: colors.dangerSoft,
    borderColor: 'rgba(255,136,160,0.28)',
  },
  actionGhost: {
    backgroundColor: colors.tabIdle,
    borderColor: colors.tabBorder,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  actionTextPrimary: {
    color: colors.textPrimary,
  },
  actionTextSecondary: {
    color: colors.textSecondary,
  },
  actionTextDanger: {
    color: '#FFB7C6',
  },
});
