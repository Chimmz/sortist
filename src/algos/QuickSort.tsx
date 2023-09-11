import { useState, FC, useEffect, useMemo, useRef, useCallback } from 'react';
import Bars from '../components/bars/Bars';
import { BarClass, BarMovement, BarProps } from '../types';
import useAppContext from '../context/AppContext';
import useBarMovements from '../hooks/useBarMovements';
import useBar from '../hooks/useBar';
import Bar from '../components/bars/Bar';

const TOTAL_BARS = 50;

function QuickSort() {
  const { isSorting, setIsSorting, isSorted, setIsSorted } = useAppContext();
  const { barMovements, addBarMovement } = useBarMovements();

  const [bars, setBars] = useState<BarClass[]>(() => {
    // return Array.from(
    //   { length: TOTAL_BARS },
    //   (_, i) => new BarClass(undefined, undefined, undefined, i)
    // );
    return [
      ['orangered', 80, 'orangered'],
      ['brown', 40, 'brown'],
      ['purple', 55, 'purple'],
      ['black', 70, 'black']
      // ['yellow', 30, 'yellow'],
      // ['blue', 30, 'blue'],
      // ['black', 20, 'black'],
      // ['pink', 90, 'pink'],
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  const partition = (start: number, end: number) => {
    let pivotBar = bars[start];
    let [leftItr, rightItr] = [start + 1, end];
    // console.log('Pivot is ', pivot);
    console.log({ start, end });
    console.log({ pivotBar });
    console.log({ leftItr, rightItr });

    while (leftItr < rightItr) {
      while (leftItr < rightItr) {
        console.log('do-while running: ', bars[leftItr].height);
        if (bars[leftItr].height > pivotBar.height) break;
        // console.log(`In partition arr[${start} - ${end}], and pivot: ${pivotBar.height}: `, {
        //   leftItr
        // });
        // console.log({ leftItr, rightItr });
        // console.log('1st loop: ', bars[leftItr + 1], pivotBar.height);
        leftItr++;
      }

      while (true) {
        console.log('while-loop running: ', { leftItr, rightItr });
        // console.log(
        //   `In partition arr[${start} - ${end}], and pivot: ${pivotBar.height}: `,
        //   {  rightItr }
        // );
        // console.log('2nd loop: ', bars[rightItr].height, pivotBar.height);
        if (bars[rightItr].height <= pivotBar.height) break;
        rightItr--;
      }

      if (leftItr < rightItr) {
        setBars(arr => {
          [arr[leftItr], arr[rightItr]] = [arr[rightItr], arr[leftItr]];
          return arr;
        });
      }
    }
    const pivotIndex = rightItr;
    setBars(arr => {
      [arr[start], arr[rightItr]] = [arr[rightItr], arr[start]];
      return arr;
    });
    // console.log(`After partitioning arr[${start} - ${end}]`, arr);
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
