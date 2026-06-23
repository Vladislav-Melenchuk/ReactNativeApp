import { KeyButtonItem, MemoryLabel } from '../types/calculator';

export const THIN_SPACE = '\u202F';
export const MAX_DIGITS = 12;

export const MEMORY_LABELS: MemoryLabel[] = ['MC', 'MR', 'M+', 'M−', 'MS'];

export const CALCULATOR_ROWS: KeyButtonItem[][] = [
  [
    { label: 'AC', type: 'secondary', action: 'clear' },
    { label: '±', type: 'secondary', action: 'toggle-sign' },
    { label: '%', type: 'secondary', action: 'percent' },
    { label: '⌫', type: 'secondary', action: 'backspace' },
  ],
  [
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '÷', type: 'operator' },
  ],
  [
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '×', type: 'operator' },
  ],
  [
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '−', type: 'operator' },
  ],
  [
    { label: '0', type: 'number', wide: true },
    { label: ',', type: 'number', action: 'decimal' },
    { label: '+', type: 'operator' },
  ],
];
