import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';

export const okButtonStyle = {
  ...commonStyle.button,
  width: 160,
  height: 60,
  backgroundColor: Colors.okButton,
};

export const okButtonTextStyle = {
  color: Colors.font,
  fontSize: 20,
  fontWeight: 'bold',
};
