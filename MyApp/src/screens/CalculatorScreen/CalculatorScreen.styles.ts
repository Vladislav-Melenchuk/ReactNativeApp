import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const calculatorScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  wrapperLandscape: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'stretch',
  },
  displayColumn: {
    justifyContent: 'space-between',
  },
  displayColumnLandscape: {
    flex: 0.92,
  },
  controlsColumn: {
    flex: 1,
  },
  controlsColumnLandscape: {
    flex: 1.4,
  },
  displayCard: {
    minHeight: 170,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
    paddingVertical: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  displayCardLandscape: {
    minHeight: 0,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  displayValue: {
    color: colors.textPrimary,
    fontWeight: '700',
    textAlign: 'right',
    letterSpacing: 0.4,
  },
  memoryRow: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 14,
  },
  memoryRowLandscape: {
    marginBottom: 0,
  },
  memoryButton: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.memoryButton,
    borderWidth: 1,
    borderColor: 'rgba(176,186,255,0.18)',
  },
  memoryButtonDisabled: {
    backgroundColor: 'rgba(116,132,255,0.08)',
    borderColor: 'rgba(176,186,255,0.10)',
  },
  memoryText: {
    color: '#E9EDFF',
    fontSize: 14,
    fontWeight: '700',
  },
  memoryTextDisabled: {
    color: 'rgba(233,237,255,0.38)',
  },
  keypad: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  keyButton: {
    flex: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  numberButton: {
    backgroundColor: colors.buttonNumber,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  secondaryButton: {
    backgroundColor: colors.buttonSecondary,
    borderColor: 'rgba(214,195,255,0.16)',
  },
  secondaryButtonDisabled: {
    backgroundColor: 'rgba(149,109,255,0.10)',
    borderColor: 'rgba(214,195,255,0.09)',
  },
  operatorButton: {
    backgroundColor: colors.buttonOperator,
    borderColor: 'rgba(168,200,255,0.22)',
  },
  operatorButtonActive: {
    backgroundColor: colors.buttonOperatorActive,
  },
  equalsButton: {
    flex: 1,
    backgroundColor: colors.buttonEquals,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  equalsButtonDisabled: {
    backgroundColor: 'rgba(110,118,255,0.28)',
    borderColor: 'rgba(255,255,255,0.10)',
  },
  wideButton: {
    flex: 2.12,
  },
  numberText: {
    color: '#FAFBFF',
    fontSize: 28,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#F3EFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  secondaryTextDisabled: {
    color: 'rgba(243,239,255,0.42)',
  },
  operatorText: {
    color: '#F4F8FF',
    fontSize: 28,
    fontWeight: '700',
  },
  equalsText: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  equalsTextDisabled: {
    color: 'rgba(247,248,255,0.48)',
  },
});
