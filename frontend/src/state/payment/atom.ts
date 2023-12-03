import { atom } from 'recoil';
import PaymentAAAAHHH from '../../interfaces/paymentAH';

export const paymentAHDataListState = atom({
  key: 'paymentAHDataState',
  default: [] as PaymentAAAAHHH[],
});

export const currentPaymentAHDataState = atom({
  key: 'currentPaymentAHDataState',
  default: null,
})
