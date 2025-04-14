export const rangeTimeOptions = [
  { key: '3', label: '3 meses' },
  { key: '6', label: '6 meses' },
  { key: '9', label: '9 meses' },
  { key: '12', label: '1 año' },
];

export const getPercentageByMonths = (months: number) => {
  switch (months) {
    case 3:
      return 1;
    case 6:
      return 2;
    case 9:
      return 3;
    case 12:
      return 4;
    default:
      return 0;
  }
};

export const getFeePercentage = (amount: number) => {
  if (amount <= 1000) return 2;
  if (amount <= 10000) return 1;
  if (amount <= 35000) return 0.5;
  return 0.25;
};

export const actionModalConst = {
  SHOWQR: 'SHOWQR',
  SHOWSTATUS: 'SHOWSTATUS',
};
