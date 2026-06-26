import React, { ReactNode, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { animatedButtonStyles } from './AnimatedButton.styles';

type AnimatedButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function AnimatedButton({
  children,
  disabled,
  label,
  onPress,
  style,
  textStyle,
}: AnimatedButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <Pressable
        android_ripple={disabled ? undefined : { color: 'rgba(255,255,255,0.08)' }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => !disabled && animateTo(0.96)}
        onPressOut={() => animateTo(1)}
        style={animatedButtonStyles.pressable}
      >
        {children ?? <Text style={textStyle}>{label}</Text>}
      </Pressable>
    </Animated.View>
  );
}
