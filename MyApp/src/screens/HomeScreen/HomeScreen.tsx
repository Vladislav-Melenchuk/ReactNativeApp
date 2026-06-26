import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { TabKey } from '../../types/app';
import { homeScreenStyles } from './HomeScreen.styles';

const QUICK_ACTIONS: { color: string; key: TabKey; subtitle: string; title: string }[] = [
  { key: 'gestures', title: 'Жести', subtitle: 'Діагоналі та 4 напрями', color: '#20C997' },
  { key: 'animation', title: 'Анімації', subtitle: 'Живі демонстрації', color: '#8B6DFF' },
  { key: 'finance', title: 'Валюти', subtitle: 'Курси на дату', color: '#F4B740' },
  { key: 'account', title: 'Профіль', subtitle: 'Редагування і валідація', color: '#4C8EFF' },
];

export function HomeScreen({ onSelectTab }: { onSelectTab: (tab: TabKey) => void }) {
  return (
    <ScrollView
      contentContainerStyle={homeScreenStyles.content}
      style={homeScreenStyles.scroll}
    >
      <View style={homeScreenStyles.hero}>
        <Text style={homeScreenStyles.eyebrow}>Nova Workspace</Text>
        <Text style={homeScreenStyles.title}>Добрий день, Владислав</Text>
        <Text style={homeScreenStyles.description}>Усе важливе зібране поруч.</Text>
      </View>

      <Text style={homeScreenStyles.sectionTitle}>Швидкий доступ</Text>
      <View style={homeScreenStyles.actionGrid}>
        {QUICK_ACTIONS.map(action => (
          <Pressable
            key={action.key}
            onPress={() => onSelectTab(action.key)}
            style={homeScreenStyles.actionCard}
          >
            <View
              style={[
                homeScreenStyles.actionAccent,
                { backgroundColor: action.color },
              ]}
            />
            <View style={homeScreenStyles.actionBody}>
              <View>
                <Text style={homeScreenStyles.actionTitle}>{action.title}</Text>
                <Text style={homeScreenStyles.actionText}>{action.subtitle}</Text>
              </View>
              <Text style={homeScreenStyles.actionArrow}>→</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={homeScreenStyles.focusCard}>
        <Text style={homeScreenStyles.focusLabel}>Фокус дня</Text>
        <Text style={homeScreenStyles.focusTitle}>
          Оновити профіль та переглянути анімації
        </Text>
      </View>
    </ScrollView>
  );
}
