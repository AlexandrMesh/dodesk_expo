import { StyleSheet } from 'react-native';
import colors from '~styles/colors';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: 90,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineContainer: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 102,
  },
  voiceButton: {
    backgroundColor: colors.planned,
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 5,
    zIndex: 2,
  },
  voiceButtonActive: {
    backgroundColor: colors.error
  },
  smallVoiceButton: {
    backgroundColor: colors.planned,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 102,
  },
  wave: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: colors.error,
    zIndex: 1,
  }
});
