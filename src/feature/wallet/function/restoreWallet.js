import {handleError} from '../../../common/function/error';
import {addWallet} from '../../database/function/wallets';
import {getAddress} from '../../keyManagement/function/address';
import {createChildKey} from '../../keyManagement/function/createChild';
import {getTransactionList} from '../../transaction/function/transactionFunction';

export async function restoreWallet() {
  try {
    let index = 0;
    while (1) {
      const {publicKey} = await createChildKey(index);
      const address = getAddress(publicKey, 'bitcoinTestNet');
      const transactions = await getTransactionList(address, 'bitcoinTestNet');
      if (transactions.length) {
        await addWallet(index, `wallet ${index}`, 'standard');
      } else {
        break;
      }
      index = index + 1;
    }
  } catch (error) {
    handleError('Restore Wallet Error', error);
  }
}
