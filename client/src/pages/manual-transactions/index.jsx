import auth from '../../auth';
import ManualTransactions from './manual-transactions';
export {ManualTransactions as ManualTransactionsPopup};
export default auth(ManualTransactions);