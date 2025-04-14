import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { SimulatorForm } from '@/components/SimulatorForm';

import userEvent from '@testing-library/user-event';

describe('SimulatorForm', () => {
  const mockHandleSetAmount = vi.fn();
  const mockHandleSetSelectedTime = vi.fn();
  const mockHandleSetSelectedBenefitType = vi.fn();
  let formContainer: HTMLElement;
  let amountInput: HTMLElement;
  let timeSelectButton: HTMLElement;
  let benefitTypeSelectButton: HTMLElement;

  const setup = () => {
    render(
      <SimulatorForm
        amount={100}
        selectedTime="3"
        handleSetAmount={mockHandleSetAmount}
        handleSetSelectedTime={mockHandleSetSelectedTime}
        selectedBenefitType="type1"
        handleSetSelectedBenefitType={mockHandleSetSelectedBenefitType}
      />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    setup();
    formContainer = screen.getByTestId('simulator-form');

    amountInput = within(formContainer).getByRole('textbox', {
      name: /Monto semilla/i,
    });

    timeSelectButton = within(formContainer).getByRole('button', {
      name: /Selecciona el rango de tiempo/i,
    });

    benefitTypeSelectButton = within(formContainer).getByRole('button', {
      name: /Selecciona el tipo de beneficio/i,
    });
  });

  test('debería renderizar el formulario correctamente', () => {
    expect(amountInput).toBeDefined();
    expect(timeSelectButton).toBeDefined();
    expect(benefitTypeSelectButton).toBeDefined();

    expect(screen.getByTestId('simulator-form')).toBeInTheDocument();
  });

  test('debería llamar a handleSetAmount cuando cambia el monto', async () => {
    const formContainer = screen.getByTestId('simulator-form');
    const amountInput = within(formContainer).getByRole('textbox', {
      name: /Monto semilla/i,
    });

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '500');
    amountInput.blur();
    expect(mockHandleSetAmount).toHaveBeenLastCalledWith(500);
  });

  test('debería llamar a handleSetSelectedTime cuando cambia el tiempo', async () => {
    await userEvent.click(timeSelectButton);

    const timeSelect = screen.getByRole('option', { name: /6 meses/i });
    await userEvent.click(timeSelect);
    expect(mockHandleSetSelectedTime).toHaveBeenCalledWith('6');
  });

  test('debería llamar a handleSetSelectedTime cuando cambia el tiempo', async () => {
    await userEvent.click(benefitTypeSelectButton);

    const benefitTypeSelect = screen.getByRole('option', { name: 'Simple' });

    await userEvent.click(benefitTypeSelect);
    expect(mockHandleSetSelectedBenefitType).toHaveBeenCalledWith('simple');
  });
});
