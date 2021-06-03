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
};
