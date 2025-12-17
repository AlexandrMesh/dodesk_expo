import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  task: {
    padding: 15,
    paddingRight: 5,
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.neutral_medium
  },
  taskTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  leftButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
  addSubtaskButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.neutral_medium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6
  },
  addSubtaskIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.neutral_medium,
    marginTop: -2
  },
  titleWrapper: {
    flex: 1,
    marginRight: 10
  },
  expandButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.in_progress,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  expandIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.neutral_white
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
  },
  subtaskCount: {
    color: colors.neutral_medium,
    fontSize: 14
  },
  subtasksContainer: {
    marginTop: 15,
    marginLeft: 62,
    paddingLeft: 0
  },
  subtask: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.neutral_medium
  },
  subtaskCompleted: {
    borderLeftColor: colors.success || colors.neutral_medium,
    opacity: 0.7
  },
  subtaskTitleWrapper: {
    flex: 1,
    marginRight: 10
  },
  subtaskTitle: {
    fontSize: 16,
    color: colors.neutral_light
  },
  subtaskCreatedAt: {
    fontSize: 12,
    color: colors.neutral_medium,
    marginTop: 4
  },
  subtaskCheckBox: {
    paddingHorizontal: 8
  }
});
