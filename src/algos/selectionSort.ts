import { Algo, BarMovement, BarProps } from '../types';

const findShortestBar = (bars: BarProps[]) => {
  const barsArray = bars.slice(0);
  let shortestBar = barsArray[0],
    shortestBarIndex = 0;

  for (let i = 0; i < barsArray.length; i++) {
    if (barsArray[i].height < shortestBar.height) {
      shortestBar = barsArray[i];
      shortestBarIndex = i;
    }
  }

  return [shortestBar, shortestBarIndex] as [BarProps, number];
};

const selectionSort: Algo = async (bars: BarProps[], opts) => {
  const barsArray = bars.slice(0);
  opts.onSortStart?.();

  for (let lastSortedIndex = 0; lastSortedIndex <= barsArray.length - 2; lastSortedIndex++) {
    let shortestBarIndex = lastSortedIndex;
    let shortestBar = barsArray[shortestBarIndex];

    for (let i = lastSortedIndex + 1; i < barsArray.length; i++) {
      if (barsArray[i].height < shortestBar.height) {
        shortestBar = barsArray[i];
        shortestBarIndex = i;
      }
    }

    opts.addMovement(
      barsArray[lastSortedIndex].id,
      new BarMovement([lastSortedIndex, shortestBarIndex])
    );
    opts.addMovement(
      barsArray[shortestBarIndex].id,
      new BarMovement([shortestBarIndex, lastSortedIndex])
    );

    [barsArray[lastSortedIndex], barsArray[shortestBarIndex]] = [
      barsArray[shortestBarIndex],
      barsArray[lastSortedIndex]
    ];
  }
  opts.onSortFinish?.();
};

export default selectionSort;
