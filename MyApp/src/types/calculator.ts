export type Operator = '+' | '-' | '×' | '÷';
export type MemoryLabel = 'MC' | 'MR' | 'M+' | 'M−' | 'MS';
export type SecondaryAction = 'clear' | 'toggle-sign' | 'percent' | 'backspace';

export type NumberKeyItem = {
  label: string;
  type: 'number';
  action?: 'decimal';
  wide?: boolean;
};

export type OperatorKeyItem = {
  label: string;
  type: 'operator';
};

export type SecondaryKeyItem = {
  label: string;
  type: 'secondary';
  action: SecondaryAction;
};

export type KeyButtonItem = NumberKeyItem | OperatorKeyItem | SecondaryKeyItem;
