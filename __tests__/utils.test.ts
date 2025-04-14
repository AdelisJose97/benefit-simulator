import { describe, test, expect } from 'vitest';
import {
  getPercentageByMonths,
  getFeePercentage,
  rangeTimeOptions,
  actionModalConst,
} from '@/utils';

describe('utils.ts', () => {
  describe('getPercentageByMonths', () => {
    test('debería retornar el porcentaje correcto para los meses dados', () => {
      expect(getPercentageByMonths(3)).toBe(1);
      expect(getPercentageByMonths(6)).toBe(2);
      expect(getPercentageByMonths(9)).toBe(3);
      expect(getPercentageByMonths(12)).toBe(4);
    });

    test('debería retornar 0 si el valor de meses no coincide', () => {
      expect(getPercentageByMonths(1)).toBe(0);
      expect(getPercentageByMonths(0)).toBe(0);
      expect(getPercentageByMonths(24)).toBe(0);
    });
  });

  describe('getFeePercentage', () => {
    test('debería retornar el porcentaje correcto según el monto', () => {
      expect(getFeePercentage(500)).toBe(2);
      expect(getFeePercentage(1000)).toBe(2);
      expect(getFeePercentage(5000)).toBe(1);
      expect(getFeePercentage(10000)).toBe(1);
      expect(getFeePercentage(20000)).toBe(0.5);
      expect(getFeePercentage(35000)).toBe(0.5);
      expect(getFeePercentage(50000)).toBe(0.25);
    });
  });

  describe('rangeTimeOptions', () => {
    test('debería tener las opciones correctas', () => {
      expect(rangeTimeOptions).toEqual([
        { key: '3', label: '3 meses' },
        { key: '6', label: '6 meses' },
        { key: '9', label: '9 meses' },
        { key: '12', label: '1 año' },
      ]);
    });
  });

  describe('actionModalConst', () => {
    test('debería definir las constantes correctamente', () => {
      expect(actionModalConst).toMatchObject({
        SHOWQR: expect.any(String),
        SHOWSTATUS: expect.any(String),
      });
    });
  });
});
