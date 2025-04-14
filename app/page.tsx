'use client';
import { Button, useDisclosure, addToast } from '@heroui/react';
import { useState } from 'react';
import { checkPaymentStatus, createSinglePayment } from '@/services';
import { useSimulatorStore } from '@/store';
import {
  actionModalConst,
  getFeePercentage,
  getPercentageByMonths,
} from '@/utils';
import { SimulatorForm } from '@/components/SimulatorForm';
import { RangeBenefit } from '@/components/RangeBenefit';
import { SimulatorResult } from '@/components/SimulatorResult';
import { AppModal } from '@/components/AppModal';
import { SimulationResult } from '@/types';
import { ResetFiltersIcon } from '@/components/icons';

export default function Home() {
  const { setPayment, payment, setPaymentStatus, paymentStatus } =
    useSimulatorStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [amount, setAmount] = useState<number>();
  const [simulated, setSimulated] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedBenefitType, setSelectedBenefitType] = useState('');
  const [simulationResults, setSimulationResults] = useState<
    Array<SimulationResult>
  >([]);
  const [netResult, setNetResult] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionModal, setActionModal] = useState<string>('');
  const [isDisabledPayment, setIsDisabledPayment] = useState(false);

  const handleSetAmount = (value: number) => {
    if (simulated) {
      setIsDisabledPayment(true);
      setPayment(null);
      setPaymentStatus(null);
    }
    setAmount(value);
  };

  const handleSetSelectedTime = (value: string) => {
    if (simulated) {
      setIsDisabledPayment(true);
      setPayment(null);
      setPaymentStatus(null);
    }
    setSelectedTime(value);
  };
  const handleSetSelectedBenefitType = (value: string) => {
    if (simulated) {
      setIsDisabledPayment(true);
      setPayment(null);
      setPaymentStatus(null);
    }
    setSelectedBenefitType(value);
  };

  const isFormValidToSimulate = () => {
    const amountValid = Number(amount) > 0;
    const timeValid = selectedTime !== '';
    const benefitTypeValid = selectedBenefitType !== '';
    return amountValid && timeValid && benefitTypeValid;
  };

  const handleSimulate = () => {
    if (!isFormValidToSimulate()) return;
    const capital = Number(amount);
    const months = Number(selectedTime);
    const percentage = getPercentageByMonths(months);
    const results = [];
    let accumulated = capital;

    for (let month = 1; month <= months; month++) {
      const gain =
        selectedBenefitType === 'simple'
          ? capital * (percentage / 100)
          : accumulated * (percentage / 100);

      accumulated += gain;

      results.push({
        month,
        initialCapital:
          selectedBenefitType === 'simple' ? capital : accumulated - gain,
        gain: Number(gain.toFixed(2)),
        accumulated: Number(accumulated.toFixed(2)),
      });
    }

    const feePercentage = getFeePercentage(accumulated);
    const fee = accumulated * (feePercentage / 100);
    const net = accumulated - fee;

    setSimulationResults(results);
    setNetResult(net);
    setSimulated(true);
    if (isDisabledPayment) {
      setIsDisabledPayment(false);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await createSinglePayment(Number(amount));
      setPayment(response.data);
      setActionModal(actionModalConst.SHOWQR);
      onOpen();
    } catch (error: any) {
      addToast({
        title: 'Error creating payment',
        description: error?.code,
        color: 'danger',
      });
      console.error('Error creating payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckPayment = async () => {
    setIsLoading(true);
    try {
      const address = payment?.address;
      if (!address) return;
      const response = await checkPaymentStatus(address);
      setPaymentStatus(response.data);
      setActionModal(actionModalConst.SHOWSTATUS);
      onOpen();
    } catch (error: any) {
      addToast({
        title: 'Error creating payment',
        description: error?.code,
        color: 'danger',
      });
      console.error('Error checking payment status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setAmount(0);
    setSelectedTime('');
    setSelectedBenefitType('');
    setSimulated(false);
    setPayment(null);
  };

  return (
    <section className="flex flex-col justify-center gap-4 md:p-8">
      <div className="text-start ml-5">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Simulador de Ganancias
        </h1>
        <p className="text-lg mt-5">
          Calcula tus ganancias de manera sencilla y rápida.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-20 lg:gap-16 mt-11 ">
        <div className="inline-block text-center justify-center items-center">
          <SimulatorForm
            amount={amount}
            handleSetAmount={handleSetAmount}
            selectedTime={selectedTime}
            handleSetSelectedTime={handleSetSelectedTime}
            selectedBenefitType={selectedBenefitType}
            handleSetSelectedBenefitType={handleSetSelectedBenefitType}
          />
          <div className="flex justify-end mt-3 sm:w-96 mx-auto">
            <Button
              data-testid="reset-button"
              isDisabled={!isFormValidToSimulate()}
              startContent={
                <ResetFiltersIcon size={16} className="pointer-events-none" />
              }
              size="sm"
              onPress={resetFilters}
            >
              Reset/New
            </Button>
          </div>
          <div className="flex flex-col gap-4 mt-10 items-center">
            <RangeBenefit />
            <Button
              variant="ghost"
              isDisabled={!isFormValidToSimulate() || isLoading}
              className="max-w-sm w-full"
              color="primary"
              size="md"
              onPress={handleSimulate}
            >
              Simular
            </Button>
            <Button
              isDisabled={!simulated || isDisabledPayment}
              isLoading={isLoading}
              className="max-w-sm w-full"
              color="primary"
              size="md"
              onPress={handlePayment}
            >
              Depositar Ahora
            </Button>
            <Button
              isDisabled={Boolean(!payment) || isDisabledPayment}
              isLoading={isLoading}
              className="max-w-sm w-full"
              color="secondary"
              size="md"
              onPress={handleCheckPayment}
            >
              Revisar Pago
            </Button>
          </div>
        </div>
        {simulated && (
          <SimulatorResult
            netResult={netResult}
            simulationResults={simulationResults}
          />
        )}
      </div>
      <AppModal
        actionModal={actionModal}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        paymentStatus={paymentStatus}
      />
    </section>
  );
}
