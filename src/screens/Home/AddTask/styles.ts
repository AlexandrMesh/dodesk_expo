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
    borderBottomColor: colors.neutral_medium,
    borderBottomWidth: 1
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.neutral_light,
    marginLeft: 10
  },
  subTitle: {
    fontSize: 14,
    color: colors.neutral_medium,
    marginTop: 4
  },
  inputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  inputLabel: {
    color: colors.neutral_light,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1
  },
  inputCounter: {
    color: colors.neutral_medium,
    fontSize: 12
  },
  statuses: {
    paddingBottom: 10
  },
  statusWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 10,
    marginBottom: 8
  },
  statusWrapperSelected: {
    backgroundColor: 'rgba(62, 158, 213, 0.15)',
    borderWidth: 1,
    borderColor: colors.in_progress
  },
  block: {
    marginTop: 0
  },
  inputWrapper: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  radioButton: {
    marginRight: 12
  },
  statusLabel: {
    color: colors.neutral_light,
    fontSize: 16
  },
  descriptionWrapperClassName: {
    height: 180
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top'
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
  saveButton: {
    backgroundColor: colors.in_progress
  },
  footerButton: {
    maxWidth: 160,
    marginHorizontal: 10
  }
});
