import { useState, FC, useEffect, useMemo, useRef, useCallback } from 'react';
import { BarClass, BarMovement } from '../../types';
import useAppContext from '../../context/AppContext';
import useBarMovements from '../../hooks/useBarMovements';
import Bar from '../bars/Bar';
import { genBars } from '../../utils/utils';

const TOTAL_BARS = 50;

function QuickSort() {
  const { isSorting, setIsSorting, isSorted, setIsSorted } = useAppContext();
  const { barMovements, addBarMovement } = useBarMovements();

  const [bars, setBars] = useState<BarClass[]>(() => {
    // return genBars(TOTAL_BARS);
    return [
      ['orangered', 80, 'orangered'],
      ['brown', 40, 'brown'],
      ['black', 70, 'black'],
      ['purple', 55, 'purple'],
      ['blue', 30, 'blue']
      // ['yellow', 30, 'yellow'],
      // ['black', 20, 'black'],
      // ['pink', 90, 'pink'],
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  const partition = (start: number, end: number) => {
    let pivotBar = bars[start];
    let [i, j] = [start, end + 1];

    while (i < j) {
      do {
        ++i;
        if (i > end || bars[i].height > pivotBar.height) break;
      } while (true);

      do {
        --j;
        if (bars[j].height <= pivotBar.height) break;
      } while (true);

      if (i < j) [bars[i], bars[j]] = [bars[j], bars[i]];
      // const [bar_i, bar_j] = [bars[i], bars[j]];

      // if (i < j) {
      //   setBars(arr => {
      //     [arr[i], arr[j]] = [bar_j, bar_i];
      //     return arr;
      //   });
      //   addBarMovement(bar_i.id, new BarMovement(i, j));
      //   addBarMovement(bar_j.id, new BarMovement(j, i));
      //   bar_i.moveToIndex!(j);
      //   bar_j.moveToIndex!(i);
      // }
    }

    const pivotIndex = j;

    const [bar_start, bar_j] = [bars[start], bars[j]];

    [bars[start], bars[j]] = [bars[j], bars[start]];
    // setBars(arr => {
    //   [arr[start], arr[j]] = [arr[j], arr[start]];
    //   return arr;
    // });
    // addBarMovement(bar_start.id, new BarMovement(start, j));
    // addBarMovement(bar_j.id, new BarMovement(j, start));

    // bar_start.moveToIndex!(j);
    // bar_j.moveToIndex!(start);

    return pivotIndex;
  };

  const quickSort = (start: number, end: number) => {
    if (start >= end) return;

    const pivotIndex = partition(start, end);
    console.log({ pivotIndex });

    quickSort(start, pivotIndex - 1);
    quickSort(pivotIndex + 1, end);

    setIsSorting!(false);
    setIsSorted!(true);
  };

  useEffect(() => {
    if (isSorted || !isSorting) return;

    const [start, end] = [0, bars.length - 1];
    quickSort(start, end);
  }, [isSorting, isSorted]);

  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2">
      {bars.map(b => (
        <Bar {...b} key={b.id} movs={barMovements[b.id]} />
      ))}
    </div>
  );
}

export default QuickSort;
