import axios from 'axios';
import { PaymentData, PaymentResponse, PaymentStatusData } from '@/types';

export const createSinglePayment = async (mount: number) => {
  try {
    const response = await axios.post<PaymentResponse<PaymentData>>(
      process.env.NEXT_PUBLIC_API_URL + 'payments/single',
      {
        network: 'BSC',
        fundsGoal: mount,
        smartContractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      },
      {
        headers: {
          'content-type': 'application/json',
          'client-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating single payment:', error);
    throw error;
  }
};

export const checkPaymentStatus = async (address: string) => {
  try {
    const response = await axios.get<PaymentResponse<PaymentStatusData>>(
      `${process.env.NEXT_PUBLIC_API_URL}payments/status`,
      {
        params: {
          address,
          network: 'BSC',
        },
        headers: {
          'content-type': 'application/json',
          'client-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
};
