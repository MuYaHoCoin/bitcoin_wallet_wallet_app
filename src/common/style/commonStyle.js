import {Colors} from './color';

export const commonStyle = {
  background: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingTop: 20,

    backgroundImage: '../image/bitcoinBackground.png',
    backgroundColor: Colors.background,
    backgroundRepeat: 'no-repeat',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 6,
  },
  input: {
    width: '90%',
    height: 40,

    padding: 4,
    marginBottom: 24,

    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
  },
  confirmBackground: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 20,

    backgroundImage: '../image/bitcoinBackground.png',
    backgroundColor: Colors.background,
    backgroundRepeat: 'no-repeat',
  }
};
