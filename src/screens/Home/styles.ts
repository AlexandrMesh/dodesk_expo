import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    minHeight: 200,
    minWidth: 200,
    backgroundColor: colors.primary_dark
  },
  header: {
    paddingTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.neutral_light,
    borderStyle: 'dotted',
    borderBottomWidth: 2,
    borderColor: colors.neutral_light
  }
});
