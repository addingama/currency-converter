import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    '@media ios': {
      paddingTop: 20,
    },
  },
  button: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonRight: {
    alignItems: 'flex-end',
  },
  icon: {
    width: 18,
  },
});

export default styles;
