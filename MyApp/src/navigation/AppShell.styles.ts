import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

export const appShellStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 16,
  },
  page: {
    flex: 1,
  },
});
