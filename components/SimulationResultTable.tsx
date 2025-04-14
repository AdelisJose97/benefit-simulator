import { SimulationProps } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

export const SimulationResultTable = ({
  simulationResults,
  netResult,
}: SimulationProps) => {
  return (
    <Table
      isVirtualized
      isStriped
      aria-label="Resultados de simulación"
      className="mx-auto"
      maxTableHeight={300}
    >
      <TableHeader>
        <TableColumn>MES</TableColumn>
        <TableColumn>CAPITAL INICIAL</TableColumn>
        <TableColumn>GANANCIA</TableColumn>
        <TableColumn>CAPITAL ACUMULADO</TableColumn>
      </TableHeader>
      <TableBody>
        <>
          {simulationResults.map((result) => (
            <TableRow key={`month-${result.month}`}>
              <TableCell>{result.month}</TableCell>
              <TableCell>${result.initialCapital.toFixed(2)}</TableCell>
              <TableCell>+${result.gain.toFixed(2)}</TableCell>
              <TableCell>${result.accumulated.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          {simulationResults.length > 0 && (
            <TableRow key="total">
              <TableCell colSpan={3}>TOTAL - FEE</TableCell>
              <TableCell>${netResult.toFixed(2)}</TableCell>
            </TableRow>
          )}
        </>
      </TableBody>
    </Table>
  );
};
