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
    paddingHorizontal: 10
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.neutral_medium,
    borderBottomWidth: 1
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 22,
    color: colors.neutral_light,
    flex: 1
  },
  addSubtaskButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.neutral_medium,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  addSubtaskIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.neutral_medium,
    marginTop: -2
  },
  block: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: colors.neutral_light,
    fontSize: 18
  },
  bold: {
    fontWeight: 'bold'
  },
  footerButtonsWrapper: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerButton: {
    maxWidth: 90,
    marginHorizontal: 3,
    paddingHorizontal: 8
  }
});
