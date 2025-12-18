import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  task: {
    padding: 15,
    paddingRight: 10,
    paddingLeft: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: colors.in_progress
  },
  taskCompleted: {
    borderLeftColor: colors.success,
    opacity: 0.7
  },
  taskTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  leftButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10
  },
  subtaskMenuContainer: {
    position: 'relative',
    width: 28,
    height: 28,
    marginBottom: 6,
    zIndex: 100,
  },
  subtaskMenuButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 101,
  },
  addSubtaskButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  textSubtaskButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.in_progress,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 102,
  },
  titleWrapper: {
    flex: 1,
    marginRight: 10
  },
  expandButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neutral_light,
    lineHeight: 24
  },
  checkBoxWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 5
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
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskCreatedAt: {
    color: colors.neutral_medium,
    fontSize: 12,
    marginLeft: 4
  },
  subtaskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.in_progress,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  subtaskCount: {
    color: colors.neutral_white,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4
  },
  subtasksContainer: {
    marginTop: 15,
    marginLeft: 38,
    paddingLeft: 0
  },
  subtask: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.planned
  },
  subtaskCompleted: {
    borderLeftColor: colors.success,
    opacity: 0.6
  },
  subtaskTitleWrapper: {
    flex: 1,
    marginRight: 10
  },
  subtaskTitle: {
    fontSize: 15,
    color: colors.neutral_light
  },
  subtaskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  subtaskCreatedAt: {
    fontSize: 11,
    color: colors.neutral_medium,
    marginLeft: 4
  },
  subtaskCheckBox: {
    paddingHorizontal: 5
  }
});
