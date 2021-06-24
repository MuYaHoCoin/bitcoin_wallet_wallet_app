import { Colors } from "../../../common/style/color";

export const style = {
  background: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor : Colors.background,
    opacity : 0.8,
    transparent : true
  },
  text: {
    marginBottom: 12,

    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.font,
  },
  dollar: {
    marginBottom: 20,

    fontSize: 20,
    fontWeight: 'normal',
    color: Colors.font,
  },
  button: {
    marginBottom: 16,
  },
}