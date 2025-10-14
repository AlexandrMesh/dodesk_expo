import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  wrapper: {
    padding: 10,
    paddingBottom: 50,
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    minHeight: 200,
    minWidth: 200,
    backgroundColor: colors.primary_dark
  },
  stickyHeader: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.neutral_medium
  },
  completed: {
    backgroundColor: colors.neutral_light
  },
  headerTitleText: {
    fontSize: 16,
    color: colors.neutral_light
  },
  completedText: {
    color: colors.primary_dark
  },
  taskCount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
