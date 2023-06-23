export const genRandomNumber = (lower: number = 10, upper: number = 100) => {
  return Math.floor(Math.random() * (upper - lower)) + lower;
};

export const genRandomBarColor = (exceptions?: string[]) => {
  const colors = [
    '#6D09BC',
    '#000000',
    '#FF0000',
    '#1DCC00',
    '#D200CA',
    '#0057A7',
    '#0085FF'
  ];

  if (!exceptions?.length) return colors[genRandomNumber(0, colors.length - 1)];
  const exclusions = new Set(exceptions);

  let randColor = '';
  do {
    randColor = colors[genRandomNumber(0, colors.length - 1)];
  } while (exclusions.has(randColor));

  return randColor;
};
