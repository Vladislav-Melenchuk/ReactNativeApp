import React, { useMemo, useState } from 'react';
import {
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../../theme/colors';
import '../../utils/date';

type GestureMode = 'all' | 'diagonal';
type DirectionKey =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'upLeft'
  | 'upRight'
  | 'downLeft'
  | 'downRight';

type GestureResult = {
  diagonal: string;
  direction: string;
  directionKey: DirectionKey;
  id: string;
};

const SWIPE_THRESHOLD = 36;
const DIAGONAL_TOLERANCE = 52;
const CARDINAL_TOLERANCE = 24;

const DIRECTION_LABELS: Record<DirectionKey, string> = {
  up: 'Вгору',
  down: 'Вниз',
  left: 'Вліво',
  right: 'Вправо',
  upLeft: 'Лівий верх',
  upRight: 'Правий верх',
  downLeft: 'Лівий низ',
  downRight: 'Правий низ',
};

function resolveDirection(dx: number, dy: number, mode: GestureMode) {
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);

  if (mode === 'diagonal') {
    if (dx > 0 && dy < 0) {
      return 'upRight' as const;
    }

    if (dx > 0 && dy > 0) {
      return 'downRight' as const;
    }

    if (dx < 0 && dy < 0) {
      return 'upLeft' as const;
    }

    return 'downLeft' as const;
  }

  if (absX - absY > CARDINAL_TOLERANCE) {
    return dx > 0 ? ('right' as const) : ('left' as const);
  }

  if (absY - absX > CARDINAL_TOLERANCE) {
    return dy > 0 ? ('down' as const) : ('up' as const);
  }

  if (dx > 0 && dy < 0) {
    return 'upRight' as const;
  }

  if (dx > 0 && dy > 0) {
    return 'downRight' as const;
  }

  if (dx < 0 && dy < 0) {
    return 'upLeft' as const;
  }

  return 'downLeft' as const;
}

function resolveDiagonalLabel(directionKey: DirectionKey) {
  if (directionKey === 'up' || directionKey === 'down' || directionKey === 'left' || directionKey === 'right') {
    return 'Прямий свайп';
  }

  return directionKey === 'upLeft' || directionKey === 'downRight'
    ? 'Головна діагональ'
    : 'Антидіагональ';
}

export function GestureScreen() {
  const [mode, setMode] = useState<GestureMode>('diagonal');
  const [status, setStatus] = useState('Зроби свайп у центральній зоні');
  const [activeDirection, setActiveDirection] = useState<DirectionKey | null>(null);
  const [logs, setLogs] = useState<GestureResult[]>([]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) + Math.abs(gestureState.dy) > 8,
        onMoveShouldSetPanResponderCapture: (_, gestureState) =>
          Math.abs(gestureState.dx) + Math.abs(gestureState.dy) > 8,
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_, gestureState) => {
          const { dx, dy } = gestureState;
          const distance = Math.hypot(dx, dy);
          const diagonalDelta = Math.abs(Math.abs(dx) - Math.abs(dy));

          if (distance < SWIPE_THRESHOLD) {
            setStatus('Свайп занадто короткий.');
            setActiveDirection(null);
            return;
          }

          if (mode === 'diagonal' && diagonalDelta > DIAGONAL_TOLERANCE) {
            setStatus('У режимі діагоналей враховуються лише діагональні свайпи.');
            setActiveDirection(null);
            return;
          }

          const directionKey = resolveDirection(dx, dy, mode);
          const direction = DIRECTION_LABELS[directionKey];
          const diagonal = resolveDiagonalLabel(directionKey);
          const result = `${direction} • ${diagonal}`;
          const stamp = new Date().toSqlDateTime();

          console.log(`${stamp}: ${result}`);
          setStatus(result);
          setActiveDirection(directionKey);
          setLogs(current =>
            [{ diagonal, direction, directionKey, id: stamp }, ...current].slice(0, 6),
          );
        },
      }),
    [mode],
  );

  return (
    <View style={gestureStyles.screen}>
      <View style={gestureStyles.header}>
        <Text style={gestureStyles.title}>Жести</Text>
        <Text style={gestureStyles.subtitle}>{status}</Text>
      </View>

      <View style={gestureStyles.segmented}>
        <Pressable
          onPress={() => setMode('diagonal')}
          style={[
            gestureStyles.segmentButton,
            mode === 'diagonal' ? gestureStyles.segmentButtonActive : null,
          ]}
        >
          <Text
            style={[
              gestureStyles.segmentText,
              mode === 'diagonal' ? gestureStyles.segmentTextActive : null,
            ]}
          >
            Только диагонали
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setMode('all')}
          style={[
            gestureStyles.segmentButton,
            mode === 'all' ? gestureStyles.segmentButtonActive : null,
          ]}
        >
          <Text
            style={[
              gestureStyles.segmentText,
              mode === 'all' ? gestureStyles.segmentTextActive : null,
            ]}
          >
            Все свайпы
          </Text>
        </Pressable>
      </View>

      <View {...panResponder.panHandlers} style={gestureStyles.pad}>
        <View style={gestureStyles.diagonalMain} />
        <View style={gestureStyles.diagonalAnti} />
        <View style={gestureStyles.horizontalAxis} />
        <View style={gestureStyles.verticalAxis} />
        <View style={gestureStyles.centerDot} />

        {VISUAL_MARKERS.map(marker => {
          const isActive = marker.directionKey === activeDirection;

          return (
            <View
              key={marker.directionKey}
              style={[
                gestureStyles.directionMarker,
                marker.style,
                isActive ? gestureStyles.directionMarkerActive : null,
              ]}
            >
              <Text
                style={[
                  gestureStyles.directionMarkerText,
                  isActive ? gestureStyles.directionMarkerTextActive : null,
                ]}
              >
                {marker.label}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={gestureStyles.logs}>
        {logs.map(item => (
          <View
            key={item.id}
            style={[
              gestureStyles.logCard,
              item.directionKey === activeDirection ? gestureStyles.logCardActive : null,
            ]}
          >
            <Text style={gestureStyles.logTitle}>{item.direction}</Text>
            <Text style={gestureStyles.logSubtitle}>{item.diagonal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const gestureStyles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 18,
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
    lineHeight: 22,
  },
  segmented: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 8,
  },
  segmentButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.tabActive,
  },
  segmentText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: colors.textPrimary,
  },
  pad: {
    flex: 1,
    minHeight: 340,
    borderRadius: 30,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  diagonalMain: {
    position: 'absolute',
    top: '50%',
    left: '-15%',
    width: '130%',
    height: 2,
    backgroundColor: 'rgba(32,201,151,0.42)',
    transform: [{ rotate: '45deg' }],
  },
  diagonalAnti: {
    position: 'absolute',
    top: '50%',
    left: '-15%',
    width: '130%',
    height: 2,
    backgroundColor: 'rgba(76,142,255,0.42)',
    transform: [{ rotate: '-45deg' }],
  },
  horizontalAxis: {
    position: 'absolute',
    top: '50%',
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: 'rgba(245,247,255,0.16)',
  },
  verticalAxis: {
    position: 'absolute',
    left: '50%',
    top: 24,
    bottom: 24,
    width: 1,
    backgroundColor: 'rgba(245,247,255,0.16)',
  },
  centerDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 18,
    height: 18,
    borderRadius: 999,
    marginLeft: -9,
    marginTop: -9,
    backgroundColor: colors.textPrimary,
  },
  directionMarker: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  directionMarkerActive: {
    backgroundColor: colors.tabActive,
    borderColor: 'rgba(205,222,255,0.34)',
    transform: [{ scale: 1.08 }],
  },
  directionMarkerText: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  directionMarkerTextActive: {
    color: colors.textPrimary,
  },
  cornerTopLeft: {
    top: 20,
    left: 20,
  },
  edgeTop: {
    top: 16,
    left: '50%',
    marginLeft: -22,
  },
  cornerTopRight: {
    top: 20,
    right: 20,
  },
  edgeLeft: {
    left: 16,
    top: '50%',
    marginTop: -22,
  },
  edgeRight: {
    right: 16,
    top: '50%',
    marginTop: -22,
  },
  cornerBottomLeft: {
    bottom: 20,
    left: 20,
  },
  edgeBottom: {
    bottom: 16,
    left: '50%',
    marginLeft: -22,
  },
  cornerBottomRight: {
    bottom: 20,
    right: 20,
  },
  logs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  logCard: {
    width: '47%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  logCardActive: {
    backgroundColor: colors.surfaceStrong,
  },
  logTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  logSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
});

const markerPositionStyles = StyleSheet.create<Record<DirectionKey, ViewStyle>>({
  up: {
    top: 16,
    left: '50%',
    marginLeft: -22,
  },
  down: {
    bottom: 16,
    left: '50%',
    marginLeft: -22,
  },
  left: {
    left: 16,
    top: '50%',
    marginTop: -22,
  },
  right: {
    right: 16,
    top: '50%',
    marginTop: -22,
  },
  upLeft: {
    top: 20,
    left: 20,
  },
  upRight: {
    top: 20,
    right: 20,
  },
  downLeft: {
    bottom: 20,
    left: 20,
  },
  downRight: {
    bottom: 20,
    right: 20,
  },
});

const VISUAL_MARKERS: {
  directionKey: DirectionKey;
  label: string;
  style: ViewStyle;
}[] = [
  { directionKey: 'upLeft', label: '↖', style: markerPositionStyles.upLeft },
  { directionKey: 'up', label: '↑', style: markerPositionStyles.up },
  { directionKey: 'upRight', label: '↗', style: markerPositionStyles.upRight },
  { directionKey: 'left', label: '←', style: markerPositionStyles.left },
  { directionKey: 'right', label: '→', style: markerPositionStyles.right },
  { directionKey: 'downLeft', label: '↙', style: markerPositionStyles.downLeft },
  { directionKey: 'down', label: '↓', style: markerPositionStyles.down },
  { directionKey: 'downRight', label: '↘', style: markerPositionStyles.downRight },
];
