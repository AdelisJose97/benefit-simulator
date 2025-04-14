import { create } from 'zustand';
import { PaymentData, PaymentStatusData } from '@/types';

interface SimulatorStore {
  payment: PaymentData | null;
  paymentStatus: PaymentStatusData | null;
  setPayment: (paymentData: PaymentData | null) => void;
  setPaymentStatus: (paymentStatusData: PaymentStatusData | null) => void;
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  paymentStatus: null,
  payment: null,
  setPayment: (paymentData) => set(() => ({ payment: paymentData })),
  setPaymentStatus: (paymentStatusData) =>
    set(() => ({ paymentStatus: paymentStatusData })),
}));
