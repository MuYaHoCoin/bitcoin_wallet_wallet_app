import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Colors} from '../../../../common/style/color';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.font,

    marginRight: 8,
  },
  image: {
    width: 16,
    height: 16,
  },
};

const copytoClipboard = (adr) => {
  Clipboard.setString(adr);
  alert("copied address clipboard");
}

const IconTitle = ({title, icon, onPress, value}) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
      <TouchableOpacity onPress={() => copytoClipboard(value)}>
        <Image source={icon} style={style.image} resizeMode={'contain'} />
      </TouchableOpacity>
    </View>
  );
};

export default IconTitle;
