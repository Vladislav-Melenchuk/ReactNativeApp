import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';

export const appShellStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 98,
  },
  page: {
    flex: 1,
  },
});
