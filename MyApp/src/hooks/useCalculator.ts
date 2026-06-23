import { useState } from 'react';

import { MAX_DIGITS } from '../constants/calculator';
import { MemoryLabel, Operator, SecondaryAction } from '../types/calculator';
import {
  calculate,
  clampDisplay,
  countDigits,
  normalizeOperatorLabel,
  normalizeZero,
  parseValue,
} from '../utils/calculator';

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);
  const [memoryValue, setMemoryValue] = useState<number | null>(null);
  const [overwriteDisplay, setOverwriteDisplay] = useState(false);
  const [lastOperand, setLastOperand] = useState<number | null>(null);
  const [lastOperator, setLastOperator] = useState<Operator | null>(null);

  const canRecallMemory = memoryValue !== null;
  const canStoreMemory = display !== 'Error' && Number.isFinite(parseValue(display));
  const canToggleSign = display !== 'Error' && display !== '0';
  const canUseBackspace = display === 'Error' || display !== '0' || overwriteDisplay;
  const canUseEquals =
    (pendingOperator !== null && storedValue !== null) ||
    (lastOperator !== null && lastOperand !== null);
  const canUsePercent = display !== 'Error' && Number.isFinite(parseValue(display));

  const clearError = () => {
    setDisplay('Error');
    setStoredValue(null);
    setPendingOperator(null);
    setOverwriteDisplay(true);
    setLastOperand(null);
    setLastOperator(null);
  };

  const resetState = () => {
    setDisplay('0');
    setStoredValue(null);
    setPendingOperator(null);
    setOverwriteDisplay(false);
    setLastOperand(null);
    setLastOperator(null);
  };

  const commitDisplay = (rawValue: number) => {
    const nextDisplay = clampDisplay(rawValue);

    if (nextDisplay === 'Error') {
      clearError();
      return false;
    }

    setDisplay(nextDisplay);
    return true;
  };

  const pushDigit = (digit: string) => {
    if (display === 'Error' || overwriteDisplay) {
      setDisplay(digit);
      setOverwriteDisplay(false);
      return;
    }

    const nextValue = display === '0' ? digit : `${display}${digit}`;

    if (countDigits(nextValue) > MAX_DIGITS) {
      return;
    }

    setDisplay(normalizeZero(nextValue));
  };

  const pushDecimal = () => {
    if (display === 'Error' || overwriteDisplay) {
      setDisplay('0.');
      setOverwriteDisplay(false);
      return;
    }

    if (display.includes('.')) {
      return;
    }

    setDisplay(`${display}.`);
  };

  const handleOperator = (operatorLabel: string) => {
    const operator = normalizeOperatorLabel(operatorLabel);
    const currentValue = parseValue(display);

    if (!Number.isFinite(currentValue)) {
      return;
    }

    if (pendingOperator !== null && storedValue !== null && !overwriteDisplay) {
      const result = calculate(storedValue, currentValue, pendingOperator);

      if (!Number.isFinite(result) || !commitDisplay(result)) {
        return;
      }

      setStoredValue(result);
      setPendingOperator(operator);
      setOverwriteDisplay(true);
      setLastOperand(null);
      setLastOperator(null);
      return;
    }

    setStoredValue(currentValue);
    setPendingOperator(operator);
    setOverwriteDisplay(true);
    setLastOperand(null);
    setLastOperator(null);
  };

  const handleEquals = () => {
    const currentValue = parseValue(display);

    if (!Number.isFinite(currentValue)) {
      return;
    }

    if (pendingOperator !== null && storedValue !== null) {
      const operand = overwriteDisplay ? storedValue : currentValue;
      const result = calculate(storedValue, operand, pendingOperator);

      if (!Number.isFinite(result) || !commitDisplay(result)) {
        return;
      }

      setStoredValue(result);
      setLastOperand(operand);
      setLastOperator(pendingOperator);
      setPendingOperator(null);
      setOverwriteDisplay(true);
      return;
    }

    if (lastOperator !== null && lastOperand !== null) {
      const result = calculate(currentValue, lastOperand, lastOperator);

      if (!Number.isFinite(result) || !commitDisplay(result)) {
        return;
      }

      setStoredValue(result);
      setOverwriteDisplay(true);
    }
  };

  const handlePercent = () => {
    if (display === 'Error') {
      return;
    }

    const currentValue = parseValue(display);

    if (!Number.isFinite(currentValue)) {
      return;
    }

    const result =
      storedValue !== null && pendingOperator !== null
        ? (storedValue * currentValue) / 100
        : currentValue / 100;

    if (!commitDisplay(result)) {
      return;
    }

    setOverwriteDisplay(false);
  };

  const handleToggleSign = () => {
    if (display === 'Error' || display === '0') {
      return;
    }

    if (overwriteDisplay) {
      setOverwriteDisplay(false);
    }

    setDisplay(current =>
      current.startsWith('-') ? current.slice(1) : `-${current}`,
    );
  };

  const handleBackspace = () => {
    if (display === 'Error') {
      resetState();
      return;
    }

    if (overwriteDisplay) {
      setDisplay('0');
      setOverwriteDisplay(false);
      return;
    }

    const nextValue = display.slice(0, -1);

    if (nextValue === '' || nextValue === '-' || nextValue === '-0') {
      setDisplay('0');
      return;
    }

    setDisplay(nextValue.endsWith('.') ? nextValue.slice(0, -1) : nextValue);
  };

  const handleMemoryPress = (label: MemoryLabel) => {
    const currentValue = parseValue(display);
    const safeCurrentValue = Number.isFinite(currentValue) ? currentValue : 0;

    switch (label) {
      case 'MC':
        if (canRecallMemory) {
          setMemoryValue(null);
        }
        break;
      case 'MR':
        if (canRecallMemory && memoryValue !== null) {
          const nextDisplay = clampDisplay(memoryValue);

          if (nextDisplay === 'Error') {
            clearError();
            return;
          }

          setDisplay(nextDisplay);
          setOverwriteDisplay(true);
        }
        break;
      case 'M+':
        if (canStoreMemory) {
          setMemoryValue((memoryValue ?? 0) + safeCurrentValue);
        }
        break;
      case 'M−':
        if (canStoreMemory) {
          setMemoryValue((memoryValue ?? 0) - safeCurrentValue);
        }
        break;
      case 'MS':
        if (canStoreMemory) {
          setMemoryValue(safeCurrentValue);
        }
        break;
    }
  };

  const isMemoryButtonActive = (label: MemoryLabel) => {
    if (label === 'MC' || label === 'MR') {
      return canRecallMemory;
    }

    return canStoreMemory;
  };

  const isSecondaryButtonActive = (action: SecondaryAction) => {
    switch (action) {
      case 'clear':
        return true;
      case 'toggle-sign':
        return canToggleSign;
      case 'percent':
        return canUsePercent;
      case 'backspace':
        return canUseBackspace;
      default:
        return true;
    }
  };

  return {
    display,
    pendingOperator,
    pushDigit,
    pushDecimal,
    handleOperator,
    handleEquals,
    handlePercent,
    handleToggleSign,
    handleBackspace,
    handleMemoryPress,
    isEqualsActive: canUseEquals,
    isMemoryButtonActive,
    isSecondaryButtonActive,
    resetState,
  };
}
