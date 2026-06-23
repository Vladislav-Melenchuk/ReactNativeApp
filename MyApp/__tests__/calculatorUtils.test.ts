import { MAX_DIGITS } from '../src/constants/calculator';
import {
  clampDisplay,
  countDigits,
  formatDisplay,
  normalizeZero,
} from '../src/utils/calculator';

describe('calculator formatting', () => {
  it('groups long integers with thin spaces', () => {
    expect(formatDisplay('12345678')).toBe('12\u202F345\u202F678');
    expect(formatDisplay('-1234567.89')).toBe('-1\u202F234\u202F567,89');
  });

  it('does not count separators toward max digits', () => {
    expect(countDigits(formatDisplay('123456789012'))).toBe(MAX_DIGITS);
  });

  it('normalizes leading zeroes', () => {
    expect(normalizeZero('000123')).toBe('123');
    expect(normalizeZero('-0123')).toBe('-123');
  });

  it('switches to exponential form for overly long results', () => {
    expect(clampDisplay(1234567890123)).toContain('e+');
  });
});
