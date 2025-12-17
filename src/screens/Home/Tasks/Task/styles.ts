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
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  titleWrapper: {
    flex: 1,
    marginRight: 10
  },
  titleWrapperNoSubtasks: {
    marginLeft: 0
  },
  expandButton: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: colors.neutral_medium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  expandIcon: {
    fontSize: 14,
    color: colors.primary_dark
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
    marginLeft: 16,
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
  subtaskCheckBox: {
    paddingHorizontal: 8
  }
});
