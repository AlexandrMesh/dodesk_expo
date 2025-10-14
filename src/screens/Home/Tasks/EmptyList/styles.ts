import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  emptyListWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListText: {
    fontSize: 20,
    color: colors.neutral_medium
  }
});
