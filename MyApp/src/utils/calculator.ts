import { MAX_DIGITS, THIN_SPACE } from '../constants/calculator';
import { Operator } from '../types/calculator';

export function countDigits(value: string) {
  return value.replace(/\D/g, '').length;
}

export function normalizeZero(value: string) {
  const normalized = value.replace(/^(-?)0+(?=\d)/, '$1');

  if (normalized === '-0') {
    return '0';
  }

  return normalized;
}

export function clampDisplay(value: number) {
  if (!Number.isFinite(value)) {
    return 'Error';
  }

  const rounded = Number.parseFloat(value.toFixed(10)).toString();
  const [integerPart, decimalPart] = rounded.split('.');
  const compact = `${integerPart}${decimalPart ?? ''}`;

  if (compact.replace('-', '').length > MAX_DIGITS) {
    return value.toExponential(6);
  }

  return rounded;
}

export function formatDisplay(rawValue: string) {
  if (rawValue === 'Error') {
    return 'Неможливо ділити на 0';
  }

  const sign = rawValue.startsWith('-') ? '-' : '';
  const unsigned = sign ? rawValue.slice(1) : rawValue;
  const [integerPart, decimalPart] = unsigned.split('.');
  const groupedInteger = (integerPart || '0').replace(
    /\B(?=(\d{3})+(?!\d))/g,
    THIN_SPACE,
  );

  if (decimalPart === undefined) {
    return `${sign}${groupedInteger}`;
  }

  return `${sign}${groupedInteger},${decimalPart}`;
}

export function parseValue(rawValue: string) {
  if (rawValue === 'Error') {
    return Number.NaN;
  }

  return Number.parseFloat(rawValue);
}

export function calculate(left: number, right: number, operator: Operator) {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '×':
      return left * right;
    case '÷':
      return right === 0 ? Number.NaN : left / right;
    default:
      return right;
  }
}

export function normalizeOperatorLabel(operatorLabel: string): Operator {
  return operatorLabel === '−' ? '-' : (operatorLabel as Operator);
}
