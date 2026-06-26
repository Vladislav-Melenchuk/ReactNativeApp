import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../../theme/colors';

type AnimationPreset = {
  accent: string;
  key: 'diagonal' | 'pulse' | 'orbit' | 'flip';
  title: string;
};

const PRESETS: AnimationPreset[] = [
  { key: 'diagonal', title: 'Diagonal', accent: '#4C8EFF' },
  { key: 'pulse', title: 'Pulse', accent: '#20C997' },
  { key: 'orbit', title: 'Orbit', accent: '#F4B740' },
  { key: 'flip', title: 'Flip', accent: '#8B6DFF' },
];

export function AnimationScreen() {
  const [selected, setSelected] = useState<AnimationPreset['key']>('diagonal');
  const [isRunning, setIsRunning] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const resetValues = () => {
    translateX.setValue(0);
    translateY.setValue(0);
    scale.setValue(1);
    opacity.setValue(0.6);
    rotation.setValue(0);
  };

  const createParallel = (
    nextX: number,
    nextY: number,
    nextScale: number,
    nextOpacity: number,
    nextRotation: number,
    duration = 420,
  ) =>
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: nextX,
        duration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: nextY,
        duration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: nextScale,
        duration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: nextOpacity,
        duration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: nextRotation,
        duration,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

  const playSelected = () => {
    setIsRunning(true);
    resetValues();

    const sequence =
      selected === 'diagonal'
        ? Animated.sequence([
            createParallel(64, -64, 0.82, 0.3, 30, 520),
            createParallel(0, 0, 1, 0.6, 0, 420),
            createParallel(-64, 64, 1.18, 1, -30, 520),
            createParallel(0, 0, 1, 0.6, 0, 420),
          ])
        : selected === 'pulse'
          ? Animated.sequence([
              createParallel(0, 0, 1.18, 1, 0, 260),
              createParallel(0, 0, 0.94, 0.45, 0, 260),
              createParallel(0, 0, 1.1, 0.92, 0, 260),
              createParallel(0, 0, 1, 0.6, 0, 260),
            ])
          : selected === 'orbit'
            ? Animated.sequence([
                createParallel(70, -12, 0.92, 0.7, 18, 280),
                createParallel(0, -70, 1.04, 0.9, 36, 280),
                createParallel(-70, -10, 0.94, 0.7, 54, 280),
                createParallel(0, 70, 1.06, 0.92, 72, 280),
                createParallel(0, 0, 1, 0.6, 0, 280),
              ])
            : Animated.sequence([
                createParallel(0, 0, 1, 0.8, 180, 520),
                createParallel(0, 0, 0.88, 0.45, 360, 520),
                createParallel(0, 0, 1, 0.6, 0, 420),
              ]);

    sequence.start(() => setIsRunning(false));
  };

  const activePreset = PRESETS.find(item => item.key === selected) ?? PRESETS[0];

  const animatedStyle = useMemo(
    () => ({
      opacity,
      transform: [
        { translateX },
        { translateY },
        { scale },
        {
          rotate: rotation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    }),
    [opacity, rotation, scale, translateX, translateY],
  );

  return (
    <ScrollView contentContainerStyle={animationStyles.content}>
      <View style={animationStyles.header}>
        <Text style={animationStyles.title}>Анимации</Text>
        <Text style={animationStyles.subtitle}>Выбери пресет и запусти демо.</Text>
      </View>

      <View style={animationStyles.presetGrid}>
        {PRESETS.map(preset => {
          const isActive = preset.key === selected;

          return (
            <Pressable
              key={preset.key}
              onPress={() => setSelected(preset.key)}
              style={[
                animationStyles.presetCard,
                isActive ? animationStyles.presetCardActive : null,
              ]}
            >
              <View
                style={[
                  animationStyles.presetAccent,
                  { backgroundColor: preset.accent },
                ]}
              />
              <Text style={animationStyles.presetTitle}>{preset.title}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={animationStyles.stage}>
        <Animated.View
          style={[
            animationStyles.figure,
            { backgroundColor: activePreset.accent },
            animatedStyle,
          ]}
        >
          <Text style={animationStyles.figureText}>{activePreset.title}</Text>
        </Animated.View>
      </View>

      <View style={animationStyles.actions}>
        <Pressable
          disabled={isRunning}
          onPress={playSelected}
          style={[
            animationStyles.primaryButton,
            isRunning ? animationStyles.buttonDisabled : null,
          ]}
        >
          <Text style={animationStyles.primaryButtonText}>
            {isRunning ? 'Идет анимация' : 'Запустить'}
          </Text>
        </Pressable>
        <Pressable
          onPress={resetValues}
          style={animationStyles.secondaryButton}
        >
          <Text style={animationStyles.secondaryButtonText}>Сброс</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const animationStyles = StyleSheet.create({
  content: {
    gap: 18,
    paddingBottom: 8,
  },
  header: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  presetCard: {
    width: '47%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  presetCardActive: {
    backgroundColor: colors.surfaceStrong,
  },
  presetAccent: {
    width: 40,
    height: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  presetTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  stage: {
    height: 320,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  figure: {
    width: 124,
    height: 124,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  figureText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tabActive,
  },
  secondaryButton: {
    width: 110,
    minHeight: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tabIdle,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '700',
  },
});
