import React, { useMemo } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

import { CALCULATOR_ROWS, MEMORY_LABELS } from '../../constants/calculator';
import { useCalculator } from '../../hooks/useCalculator';
import { normalizeOperatorLabel, formatDisplay } from '../../utils/calculator';
import { AnimatedButton } from '../../components/AnimatedButton/AnimatedButton';
import { calculatorScreenStyles } from './CalculatorScreen.styles';

export function CalculatorScreen() {
  const { width, height } = useWindowDimensions();
  const {
    display,
    handleBackspace,
    handleEquals,
    handleMemoryPress,
    handleOperator,
    handlePercent,
    handleToggleSign,
    isEqualsActive,
    isMemoryButtonActive,
    isSecondaryButtonActive,
    pendingOperator,
    pushDecimal,
    pushDigit,
    resetState,
  } = useCalculator();

  const isCompact = width < 390;
  const isLandscape = width > height;
  const buttonGap = isCompact ? 10 : 14;
  const buttonHeight = Math.max(56, Math.min(82, height * (isLandscape ? 0.12 : 0.082)));
  const memoryButtonHeight = isCompact ? 38 : 42;

  const displayFontSize = useMemo(() => {
    const length = formatDisplay(display).length;

    if (length > 18) {
      return isCompact ? 28 : 32;
    }

    if (length > 12) {
      return isCompact ? 34 : 38;
    }

    return isCompact ? 44 : 50;
  }, [display, isCompact]);

  const renderMemoryRow = () => (
    <View
      style={[
        calculatorScreenStyles.memoryRow,
        isLandscape ? calculatorScreenStyles.memoryRowLandscape : null,
        { gap: buttonGap },
      ]}
    >
      {MEMORY_LABELS.map(label => {
        const isActive = isMemoryButtonActive(label);

        return (
          <AnimatedButton
            disabled={!isActive}
            key={label}
            label={label}
            onPress={() => handleMemoryPress(label)}
            style={[
              calculatorScreenStyles.memoryButton,
              { height: memoryButtonHeight },
              !isActive ? calculatorScreenStyles.memoryButtonDisabled : null,
            ]}
            textStyle={[
              calculatorScreenStyles.memoryText,
              !isActive ? calculatorScreenStyles.memoryTextDisabled : null,
            ]}
          />
        );
      })}
    </View>
  );

  return (
    <View
      style={[
        calculatorScreenStyles.wrapper,
        isLandscape ? calculatorScreenStyles.wrapperLandscape : null,
      ]}
    >
      <View
        style={[
          calculatorScreenStyles.displayColumn,
          isLandscape ? calculatorScreenStyles.displayColumnLandscape : null,
        ]}
      >
        <View
          style={[
            calculatorScreenStyles.displayCard,
            isLandscape ? calculatorScreenStyles.displayCardLandscape : null,
          ]}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={[
              calculatorScreenStyles.displayValue,
              { fontSize: displayFontSize },
            ]}
          >
            {formatDisplay(display)}
          </Text>
        </View>

        {isLandscape ? renderMemoryRow() : null}
      </View>

      <View
        style={[
          calculatorScreenStyles.controlsColumn,
          isLandscape ? calculatorScreenStyles.controlsColumnLandscape : null,
        ]}
      >
        {!isLandscape ? renderMemoryRow() : null}

        <View style={[calculatorScreenStyles.keypad, { gap: buttonGap }]}>
          {CALCULATOR_ROWS.map((row, rowIndex) => (
            <View
              key={`row-${rowIndex}`}
              style={[calculatorScreenStyles.row, { gap: buttonGap }]}
            >
              {row.map(item => {
                if (item.type === 'operator') {
                  const operator = normalizeOperatorLabel(item.label);

                  return (
                    <AnimatedButton
                      key={item.label}
                      label={item.label}
                      onPress={() => handleOperator(item.label)}
                      style={[
                        calculatorScreenStyles.keyButton,
                        calculatorScreenStyles.operatorButton,
                        pendingOperator === operator
                          ? calculatorScreenStyles.operatorButtonActive
                          : null,
                        { height: buttonHeight },
                      ]}
                      textStyle={calculatorScreenStyles.operatorText}
                    />
                  );
                }

                if (item.type === 'secondary') {
                  const isActive = isSecondaryButtonActive(item.action);

                  return (
                    <AnimatedButton
                      disabled={!isActive}
                      key={item.label}
                      label={item.label}
                      onPress={() => {
                        if (item.action === 'clear') {
                          resetState();
                          return;
                        }

                        if (item.action === 'toggle-sign') {
                          handleToggleSign();
                          return;
                        }

                        if (item.action === 'percent') {
                          handlePercent();
                          return;
                        }

                        handleBackspace();
                      }}
                      style={[
                        calculatorScreenStyles.keyButton,
                        calculatorScreenStyles.secondaryButton,
                        !isActive
                          ? calculatorScreenStyles.secondaryButtonDisabled
                          : null,
                        { height: buttonHeight },
                      ]}
                      textStyle={[
                        calculatorScreenStyles.secondaryText,
                        !isActive
                          ? calculatorScreenStyles.secondaryTextDisabled
                          : null,
                      ]}
                    />
                  );
                }

                return (
                  <AnimatedButton
                    key={item.label}
                    label={item.label}
                    onPress={() =>
                      item.action === 'decimal'
                        ? pushDecimal()
                        : pushDigit(item.label)
                    }
                    style={[
                      calculatorScreenStyles.keyButton,
                      calculatorScreenStyles.numberButton,
                      item.wide ? calculatorScreenStyles.wideButton : null,
                      { height: buttonHeight },
                    ]}
                    textStyle={calculatorScreenStyles.numberText}
                  />
                );
              })}

              {rowIndex === CALCULATOR_ROWS.length - 1 ? (
                <AnimatedButton
                  disabled={!isEqualsActive}
                  label="="
                  onPress={handleEquals}
                  style={[
                    calculatorScreenStyles.keyButton,
                    calculatorScreenStyles.equalsButton,
                    !isEqualsActive
                      ? calculatorScreenStyles.equalsButtonDisabled
                      : null,
                    { height: buttonHeight },
                  ]}
                  textStyle={[
                    calculatorScreenStyles.equalsText,
                    !isEqualsActive
                      ? calculatorScreenStyles.equalsTextDisabled
                      : null,
                  ]}
                />
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
