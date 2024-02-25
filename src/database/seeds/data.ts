import { PaymentMethods } from 'src/common/enums';

export const BookingDataSeed = [
  {
    merchantId: '4c590523-8bec-4426-a0b1-f76521206b91',
    consumerId: '70ca20c7-1a03-4420-a25e-66d5a2bdaa5a',
    details: 'This is a test booking 1',
    amount: 200,
    status: 'COMPLETED',
  },
  // {
  //   merchantId: '4c590523-8bec-4426-a0b1-f76521206b91',
  //   consumerId: '70ca20c7-1a03-4420-a25e-66d5a2bdaa5a',
  //   details: 'This is a test booking 2',
  //   amount: 5600,
  //   status: 'COMPLETED',
  // },
  // {
  //   merchantId: '4c590523-8bec-4426-a0b1-f76521206b91',
  //   consumerId: '70ca20c7-1a03-4420-a25e-66d5a2bdaa5a',
  //   details: 'This is a test booking 3',
  //   amount: 1260,
  //   status: 'COMPLETED',
  // },
];

export const PayMethodDataSeed = [
  {
    type: PaymentMethods.CREDIT_CARD,
  },
  {
    type: PaymentMethods.DEBIT_CARD,
  },
  {
    type: PaymentMethods.CRYPTO,
  },
  {
    type: PaymentMethods.GBP_WALLET,
  },
  {
    type: PaymentMethods.SN_WALLET,
  },
];
