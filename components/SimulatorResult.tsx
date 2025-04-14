import { SimulationProps } from '@/types';
import { SimulationResultTable } from './SimulationResultTable';

export const SimulatorResult = ({
  simulationResults,
  netResult,
}: SimulationProps) => {
  return (
    <div className="inline-block text-center justify-center relative">
      <p className="text-lg absolute -top-8 text-foreground-500">
        Cuanto ganaras
      </p>
      <SimulationResultTable
        simulationResults={simulationResults}
        netResult={netResult}
      />
    </div>
  );
};
