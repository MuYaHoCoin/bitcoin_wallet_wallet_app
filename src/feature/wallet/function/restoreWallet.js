import {handleError} from '../../../common/function/error';
import {addWallet} from '../../database/function/wallets';
import {getAddress} from '../../keyManagement/function/address';
import {getTransactionListAPI} from '../../transaction/utils/transaction.api';

export async function restoreWallet(masterNode) {
  try {
    let index = 0;
    while (1) {
      const {publicKey} = await masterNode.derivePath(
        `m/44'/61'/0'/0/${index}`,
      );
      const address = await getAddress(publicKey);
      const transactions = await getTransactionListAPI(address);
      console.log(transactions);
      if (transactions.length) {
        await addWallet(index, `wallet ${index}`, address);
      } else {
        break;
      }
      index = index + 1;
    }
    return index;
  } catch (error) {
    handleError('Restore Wallet Error', error);
  }
}
