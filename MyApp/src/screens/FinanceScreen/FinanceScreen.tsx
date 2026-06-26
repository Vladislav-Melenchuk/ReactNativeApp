import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppModal } from '../../components/AppModal/AppModal';
import { colors } from '../../theme/colors';
import { formatDayLabel, formatRateDate } from '../../utils/date';

type RateItem = {
  cc: string;
  exchangedate: string;
  rate: number;
  txt: string;
};

const PRIORITY_CODES = ['USD', 'EUR', 'PLN', 'GBP', 'CHF', 'CZK'];

export function FinanceScreen() {
  const [queryDate, setQueryDate] = useState(() => new Date());
  const [displayDate, setDisplayDate] = useState('Ще не завантажено');
  const [rates, setRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const loadRates = async (date: Date) => {
    setLoading(true);

    try {
      const response = await axios.get<RateItem[]>(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date.toYyyyMmDd()}&json`,
      );
      const responseRates = response.data ?? [];

      setRates(responseRates);

      if (responseRates.length > 0) {
        setDisplayDate(formatRateDate(responseRates[0].exchangedate));
      } else {
        setDisplayDate('Немає даних на цю дату');
      }
    } catch (error) {
      console.warn('Помилка оновлення курсів валют', error);
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRates(queryDate);
  }, []);

  const topRates = useMemo(() => {
    const preferred = PRIORITY_CODES.map(code =>
      rates.find(item => item.cc === code),
    ).filter(Boolean) as RateItem[];

    if (preferred.length >= 4) {
      return preferred;
    }

    return rates.slice(0, 6);
  }, [rates]);

  const shiftDay = (offset: number) => {
    const nextDate = new Date(queryDate);
    nextDate.setDate(queryDate.getDate() + offset);
    setQueryDate(nextDate);
    void loadRates(nextDate);
  };

  return (
    <>
      <ScrollView contentContainerStyle={financeStyles.content}>
        <View style={financeStyles.hero}>
          <Text style={financeStyles.title}>Курси валют НБУ</Text>
          <Text style={financeStyles.text}>
            Запит формує дату через Date.prototype.toYyyyMmDd(), а дата
            відображення береться з будь-якого елемента масиву rates.
          </Text>
        </View>

        <View style={financeStyles.toolbar}>
          <Pressable onPress={() => shiftDay(-1)} style={financeStyles.toolButton}>
            <Text style={financeStyles.toolButtonText}>Вчора</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              const today = new Date();
              setQueryDate(today);
              void loadRates(today);
            }}
            style={[financeStyles.toolButton, financeStyles.toolButtonPrimary]}
          >
            <Text style={financeStyles.toolButtonPrimaryText}>Сьогодні</Text>
          </Pressable>
          <Pressable onPress={() => shiftDay(1)} style={financeStyles.toolButton}>
            <Text style={financeStyles.toolButtonText}>Завтра</Text>
          </Pressable>
        </View>

        <View style={financeStyles.infoCard}>
          <Text style={financeStyles.infoLabel}>Дата запиту</Text>
          <Text style={financeStyles.infoValue}>{formatDayLabel(queryDate)}</Text>
          <Text style={financeStyles.infoLabel}>Дата з масиву rates</Text>
          <Text style={financeStyles.infoValue}>{displayDate}</Text>
        </View>

        {loading ? (
          <View style={financeStyles.loaderWrap}>
            <ActivityIndicator color={colors.accentBlue} size="large" />
            <Text style={financeStyles.loaderText}>Оновлюємо курси...</Text>
          </View>
        ) : null}

        <View style={financeStyles.rateGrid}>
          {topRates.map(rate => (
            <View key={rate.cc} style={financeStyles.rateCard}>
              <Text style={financeStyles.rateCode}>{rate.cc}</Text>
              <Text style={financeStyles.rateName}>{rate.txt}</Text>
              <Text style={financeStyles.rateValue}>{rate.rate.toFixed(2)} грн</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <AppModal
        actions={[
          {
            label: 'Спробувати ще',
            onPress: () => {
              setErrorVisible(false);
              void loadRates(queryDate);
            },
          },
          {
            label: 'Перейти на сьогодні',
            onPress: () => {
              const today = new Date();
              setQueryDate(today);
              setErrorVisible(false);
              void loadRates(today);
            },
            variant: 'secondary',
          },
          {
            label: 'Закрити',
            onPress: () => setErrorVisible(false),
            variant: 'ghost',
          },
        ]}
        message="Не вдалося отримати дані. Це може статися без доступу до мережі або якщо API тимчасово недоступне."
        onRequestClose={() => setErrorVisible(false)}
        title="Помилка завантаження"
        visible={errorVisible}
      />
    </>
  );
}

const financeStyles = StyleSheet.create({
  content: {
    gap: 18,
    paddingBottom: 12,
  },
  hero: {
    padding: 22,
    borderRadius: 24,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  toolbar: {
    flexDirection: 'row',
    gap: 10,
  },
  toolButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tabIdle,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  toolButtonPrimary: {
    backgroundColor: colors.tabActive,
  },
  toolButtonText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  toolButtonPrimaryText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  infoCard: {
    padding: 20,
    borderRadius: 22,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  loaderWrap: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  loaderText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  rateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rateCard: {
    width: '47%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  rateCode: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 6,
  },
  rateName: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    minHeight: 36,
  },
  rateValue: {
    color: '#91C0FF',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 12,
  },
});
