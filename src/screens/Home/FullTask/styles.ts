import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary_dark
  },
  wrapper: {
    paddingVertical: 10,
    maxWidth: 600,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.primary_dark
  },
  scrollWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: colors.neutral_medium,
    borderBottomWidth: 1
  },
  headerLeft: {
    flex: 1,
    marginRight: 10
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.in_progress,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  subtaskTag: {
    backgroundColor: colors.planned
  },
  typeTagText: {
    color: colors.neutral_white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.neutral_light
  },
  addSubtaskButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.neutral_medium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  infoContent: {
    flex: 1
  },
  infoLabel: {
    color: colors.neutral_medium,
    fontSize: 12,
    marginBottom: 2
  },
  infoValue: {
    color: colors.neutral_light,
    fontSize: 16
  },
  completedText: {
    color: colors.success
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 5
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  descriptionLabel: {
    color: colors.neutral_medium,
    fontSize: 14,
    marginLeft: 8
  },
  descriptionText: {
    color: colors.neutral_light,
    fontSize: 16,
    lineHeight: 24
  },
  footerButtonsWrapper: {
    paddingTop: 10,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: 'rgba(242, 76, 103, 0.15)'
  }
});
