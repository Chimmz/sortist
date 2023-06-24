import { Algo, BarMovement, BarProps } from '../types';

const selectionSort: Algo = async (bars: BarProps[], opts) => {
  // console.log({ 'opts.onSortStart': opts.onSortStart });
  opts.onSortStart?.();

  await new Promise(resolve => {
    for (let lastSortedIndex = 0; lastSortedIndex <= bars.length - 2; lastSortedIndex++) {
      console.log('Iterating..');

      let shortestBarIndex = lastSortedIndex;
      let shortestBar = bars[shortestBarIndex];

      for (let i = lastSortedIndex + 1; i < bars.length; i++) {
        if (bars[i].height < shortestBar.height) {
          shortestBar = bars[i];
          shortestBarIndex = i;
        }
      }
      console.log(
        `Shifting ${bars[lastSortedIndex].height} from ${lastSortedIndex} to ${shortestBarIndex}`
      );
      console.log(
        `Shifting ${bars[shortestBarIndex].height} from ${shortestBarIndex} to ${lastSortedIndex}`
      );

      opts.addMovement(
        bars[lastSortedIndex].id,
        new BarMovement([lastSortedIndex, shortestBarIndex])
      );
      opts.addMovement(
        bars[shortestBarIndex].id,
        new BarMovement([shortestBarIndex, lastSortedIndex])
      );

      // opts.addMovements(
      //   new BarMovement(bars[lastSortedIndex].id, [lastSortedIndex, shortestBarIndex]),
      //   new BarMovement(bars[shortestBarIndex].id, [shortestBarIndex, lastSortedIndex])
      // );
    }
    resolve(null);
  });
  opts.onSortFinish?.();
};

export default selectionSort;
