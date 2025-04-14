import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

export const PercentageBenefitTable = () => {
  return (
    <Table
      isStriped
      aria-label="Tabla de porcentajes"
      className="max-w-md mx-auto"
    >
      <TableHeader>
        <TableColumn>DURACIÓN</TableColumn>
        <TableColumn>PORCENTAJE</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="3m">
          <TableCell>3 meses</TableCell>
          <TableCell>1% mensual</TableCell>
        </TableRow>
        <TableRow key="6m">
          <TableCell>6 meses</TableCell>
          <TableCell>2% mensual</TableCell>
        </TableRow>
        <TableRow key="9m">
          <TableCell>9 meses</TableCell>
          <TableCell>3% mensual</TableCell>
        </TableRow>
        <TableRow key="12m">
          <TableCell>12 meses</TableCell>
          <TableCell>4% mensual</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
