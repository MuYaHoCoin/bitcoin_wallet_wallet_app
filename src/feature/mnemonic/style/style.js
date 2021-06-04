import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';

export const mnemonicItemContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',

  padding: 8,
};

export const mnemonicItemStyle = {
  ...commonStyle.button,
  height: 40,
  width: 160,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  marginBottom: 8,
  paddingLeft: 8,
  paddingRight: 8,

  backgroundColor: Colors.noButton,
};
export const mnemonicItemTextStyle = {
  index: {
    width: 24,

    marginRight: 8,

    color: Colors.font,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 31,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  mnemonic: {
    flex: 1,

    color: Colors.font,
    fontSize: 16,
    lineHeight: 31,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,

    color: Colors.font,
    fontSize: 15,
    lineHeight: 32,
    textAlignVertical: 'bottom',
  },
};
export const AddWalletButtonStyle = {
  ...commonStyle.button,
  width: 240,
  height: 60,

  backgroundColor: Colors.okButton,
};

export const AddWalletButtonTextStyle = {
  color: Colors.font,
  textAlign: 'center',
  fontSize: 20,
  lineHeight: 31,
  fontWeight: 'bold',
};
