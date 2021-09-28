import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import BaseComponent from '../../../common/component/BaseComponent';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
import TransactionItem from '../component/item/TransactionItem';

import {selectCreatedTransaction} from '../utils/transaction.reducer';

const style = {
  container: {
    width: '90%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    padding: 8,
    marginBottom: 20,

    backgroundColor: Colors.transaction,
    borderRadius: 12,
  },
  title: {
    marginBottom: 20,

    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.font,
  },
  subTitle: {
    fontSize: 16,
    color: Colors.text,

    marginBottom: 8,
  },
};

const TransactionDetailScreen = ({navigation}) => {
  const {inputs, outputs} = useSelector(selectCreatedTransaction);
  return (
    <BaseComponent>
      <Text style={style.title}>Transaction Detail</Text>
      <View style={style.container}>
        <Text style={style.subTitle}>Inputs</Text>
        {inputs.map((input, index) => (
          <TransactionItem
            key={index}
            addresses={input.addresses}
            value={input.output_value}
          />
        ))}
      </View>
      <View style={style.container}>
        <Text style={style.subTitle}>Outputs</Text>
        {outputs.map((output, index) => (
          <TransactionItem
            key={index}
            addresses={output.addresses}
            value={output.value}
          />
        ))}
      </View>
      <OkButton
        title={'메인화면'}
        onPress={() => {
          navigation.navigate('Main');
        }}
      />
    </BaseComponent>
  );
};

export default TransactionDetailScreen;
