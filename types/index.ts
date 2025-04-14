import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface PaymentResponse<T> {
  data: T;
  timeStart: number;
  timeEnd: number;
  timeDelta: number;
}

export interface PaymentData {
  address: string;
  network: string;
  fundsGoal: number;
  smartContractAddress: string;
  accounts: string[];
}

export interface PaymentStatusData {
  network: string;
  address: string;
  amountCaptured: number;
  smartContractAddress: string;
  smartContractSymbol: string;
  status: string;
  fundStatus: string;
  processStep: number;
  processTotalSteps: number;
  fundsGoal: number;
  fundsExpirationAt: number;
  currentBalance: number;
  forwardAddresses: any[];
}

export interface SimulationProps {
  simulationResults: Array<SimulationResult>;
  netResult: number;
}

export interface SimulationResult {
  month: number;
  initialCapital: number;
  gain: number;
  accumulated: number;
}
