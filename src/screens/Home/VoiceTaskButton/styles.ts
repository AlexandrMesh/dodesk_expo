import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  voiceButton: {
    backgroundColor: colors.planned,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 90,
    width: 64,
    height: 64,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  voiceButtonActive: {
    backgroundColor: colors.error
  }
});
