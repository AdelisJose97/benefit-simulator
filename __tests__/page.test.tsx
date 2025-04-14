import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Page from '@/app/page';
import userEvent from '@testing-library/user-event';

describe('Página Principal', () => {
  let formContainer: HTMLElement;
  let amountInput: HTMLElement;
  let timeSelectButton: HTMLElement;
  let benefitTypeSelectButton: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();

    render(<Page />);
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

  test('renderiza correctamente el título y elementos principales', () => {
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Simulador de Ganancias/i,
      }),
    ).toBeDefined();

    expect(amountInput).toBeDefined();
    expect(timeSelectButton).toBeDefined();
    expect(benefitTypeSelectButton).toBeDefined();
    expect(screen.getByRole('button', { name: /Simular/i })).toBeDefined();
  });

  test('habilita el botón de simular solo cuando todos los campos están completos', async () => {
    const simulateButton = screen.getByRole('button', { name: /Simular/i });

    expect(simulateButton).toBeDisabled();

    await userEvent.type(amountInput, '500');
    amountInput.blur();

    await userEvent.click(timeSelectButton);
    const timeSelect = screen.getByRole('option', { name: /6 meses/i });
    await userEvent.click(timeSelect);

    await userEvent.click(benefitTypeSelectButton);
    const benefitTypeSelect = screen.getByRole('option', { name: 'Simple' });
    await userEvent.click(benefitTypeSelect);

    expect(simulateButton).not.toBeDisabled();
  });

  test('resetea el formulario correctamente', async () => {
    await userEvent.type(amountInput, '500');
    amountInput.blur();

    await userEvent.click(timeSelectButton);
    const timeSelect = screen.getByRole('option', { name: /6 meses/i });
    await userEvent.click(timeSelect);

    await userEvent.click(benefitTypeSelectButton);
    const benefitTypeSelect = screen.getByRole('option', { name: 'Simple' });
    await userEvent.click(benefitTypeSelect);

    const resetButton = screen.getByTestId('reset-button');
    await userEvent.click(resetButton);

    expect(amountInput).toHaveValue('0');
    expect(timeSelectButton).toHaveValue('');
    expect(benefitTypeSelectButton).toHaveValue('');
  });
});
