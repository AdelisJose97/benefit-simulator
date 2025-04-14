import { rangeTimeOptions } from '@/utils';
import { NumberInput, Select, SelectItem } from '@heroui/react';

interface SimulatorFormProps {
  amount: number | undefined;
  handleSetAmount: (value: number) => void;
  selectedTime: string;
  handleSetSelectedTime: (value: string) => void;
  selectedBenefitType: string;
  handleSetSelectedBenefitType: (value: string) => void;
}
export const SimulatorForm = ({
  amount,
  selectedTime,
  handleSetAmount,
  handleSetSelectedTime,
  selectedBenefitType,
  handleSetSelectedBenefitType,
}: SimulatorFormProps) => {
  return (
    <div
      className="flex flex-col gap-4 items-center w-full sm:w-96 mx-auto inputs-container"
      data-testid="simulator-form"
    >
      <NumberInput
        label="Monto semilla"
        labelPlacement="inside"
        placeholder="100"
        minValue={0}
        value={amount}
        onValueChange={handleSetAmount}
      />
      <Select
        label="Selecciona el rango de tiempo"
        selectedKeys={[selectedTime]}
        onChange={(e) => handleSetSelectedTime(e.target.value)}
      >
        {rangeTimeOptions.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="Selecciona el tipo de beneficio"
        selectedKeys={[selectedBenefitType]}
        onChange={(e) => handleSetSelectedBenefitType(e.target.value)}
      >
        <SelectItem key="simple">Simple</SelectItem>
        <SelectItem key="compound">Interés compuesto</SelectItem>
      </Select>
    </div>
  );
};
