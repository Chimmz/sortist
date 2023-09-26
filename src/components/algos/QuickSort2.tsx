import { useState, FC, useEffect, useMemo, useRef, useCallback } from 'react';
import { BarClass, BarMovement } from '../../types';
import useAppContext from '../../context/AppContext';
import useBarMovements from '../../hooks/useBarMovements';
import Bar from '../bars/Bar';
import { genBars } from '../../utils/utils';
import useQuickSort from '../../hooks/useQuickSort';

const TOTAL_BARS = 50;

function QuickSort2() {
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
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  const { setBoundaries: setFullQuickSortBoundaries } = useQuickSort();

  const leftQuickSort = useQuickSort();
  const rightQuickSort = useQuickSort();

  useEffect(() => {
    if (isSorted || !isSorting) return;

    setFullQuickSortBoundaries([0, bars.length - 1]);
  }, [isSorting, isSorted]);

  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2">
      {barsCopy.map(b => (
        <Bar {...b} key={b.id} movs={barMovements[b.id]} />
      ))}
    </div>
  );
}

export default QuickSort2;
