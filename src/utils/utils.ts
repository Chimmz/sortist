import { BarClass } from '../types';

export const genRandomNumber = (lower: number = 10, upper: number = 100) => {
  return Math.floor(Math.random() * (upper - lower)) + lower;
};

export const genRandomColor = (exceptions?: string[]) => {
  const colors = [
    // '#6D09BC',
    // '#000000',
    // '#FF0000',
    // '#1DCC00',
    // '#D200CA',
    // '#0057A7',
    // '#0085FF'
    '#9A6324',
    '#808000',
    '#000075',
    '#000000',
    '#3cb44b', // Green
    '#4363d8', // Blue
    '#e6194B',
    '#911eb4', //purple
    '#f032e6',
    '#800000'
  ];

  if (!exceptions?.length) return colors[genRandomNumber(0, colors.length - 1)];
  const exclusions = new Set(exceptions);

  let randColor = '';
  do {
    randColor = colors[genRandomNumber(0, colors.length - 1)];
  } while (exclusions.has(randColor));

  return randColor;
};

export const genBars = (total: number, alignment?: 'top' | 'bottom') => {
  return Array.from(
    { length: total },
    (_, i) => new BarClass(undefined, undefined, undefined, i, alignment)
  );
};
