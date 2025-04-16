import { SimulationProps } from '@/types';
import { SimulationResultTable } from './SimulationResultTable';
import { Button } from '@heroui/react';
import { CsvIcon } from './icons';

export const SimulatorResult = ({
  simulationResults,
  netResult,
}: SimulationProps) => {
  const formatForCSV = (value: number) => value.toFixed(2);

  const handleExportCSV = () => {
    if (simulationResults.length === 0) return;

    const csvContent = [
      'Mes,Capital Inicial ($),Ganancia ($),Capital Acumulado ($)',
      ...simulationResults.map(
        (result) =>
          `${result.month},${formatForCSV(result.initialCapital)},${formatForCSV(result.gain)},${formatForCSV(result.accumulated)}`,
      ),
      `,,Total Neto,${formatForCSV(netResult)}`,
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `simulacion-${new Date().toISOString().split('T')[0]}.csv`,
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="inline-block text-center justify-center relative">
      <div className="absolute -top-10 flex justify-between w-full">
        <p className="text-md text-foreground-500">Cuanto ganarás:</p>
        <Button
          data-testid="reset-button"
          onPress={handleExportCSV}
          isDisabled={simulationResults.length === 0}
          startContent={<CsvIcon size={16} className="pointer-events-none" />}
          size="sm"
        >
          Exportar CSV
        </Button>
      </div>
      <SimulationResultTable
        simulationResults={simulationResults}
        netResult={netResult}
      />
    </div>
  );
};
