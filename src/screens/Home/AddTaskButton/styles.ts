import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  addTaskButton: {
    backgroundColor: colors.primary_medium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 64,
    height: 64,
    borderRadius: 50
  }
});
