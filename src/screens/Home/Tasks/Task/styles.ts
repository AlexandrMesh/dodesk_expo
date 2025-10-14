import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  task: {
    padding: 15,
    paddingRight: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.neutral_medium
  },
  taskTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleWrapper: {
    width: '80%'
  },
  taskTitle: {
    fontSize: 22,
    color: colors.neutral_light
  },
  checkBoxWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.neutral_medium
  },
  footer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskCreatedAt: {
    color: colors.neutral_medium
  }
});
