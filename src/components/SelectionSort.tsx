import { useState, FC, useEffect, useMemo, useRef } from 'react';
import Bars from './bars/Bars';
import { BarClass, BarProps } from '../types';
import useAppContext from '../context/AppContext';
import useBarMovements from '../hooks/useBarMovements';
import useBar from '../hooks/useBar';

const TOTAL_BARS = 200;

function SelectionSort() {
  const [lastSortedIndex, setLastSortedIndex] = useState(-1);
  const { isSorting, setIsSorting } = useAppContext();

  const [bars, setBars] = useState<BarClass[]>(() => {
    return Array.from({ length: TOTAL_BARS }, () => new BarClass());
    return [
      ['1', 85, 'orangered', 0],
      ['2', 20, 'purple', 0],
      ['3', 70, 'green', 0],
      ['4', 55, 'brown', 0]
      // @ts-ignore
    ].map(obj => new BarClass(...obj));
  });

  const [barsCopy, setBarsCopy] = useState<BarClass[]>([...bars]);
  const { barMovements, addBarMovement } = useBarMovements();

  const barsRef = useRef<HTMLDivElement | null>(null);
  const { barWidth } = useBar(barsRef);

  useEffect(() => {
    if (lastSortedIndex < 0) return;
    const maxIterationReached = lastSortedIndex === bars.length - 2;

    if (maxIterationReached) return setIsSorting?.(false);

    console.log({ lastSortedIndex });
    let shortestBarIndex = lastSortedIndex;
    let shortestBar = bars[shortestBarIndex];

    console.log(`I thought ${shortestBar.height} was the shortest`);

    for (let i = lastSortedIndex + 1; i < bars.length; i++) {
      if (bars[i].height < shortestBar.height) {
        shortestBar = bars[i];
        shortestBarIndex = i;
      }
    }
    console.log(`I realised ${shortestBar.height} was the actual shortest`);

    const sortedBar = bars[lastSortedIndex];

    const firstTranslation = () => {
      const d = (shortestBarIndex - lastSortedIndex) * barWidth!;
      bars[lastSortedIndex].translateX!(bars[lastSortedIndex].translation + d);
    };
    const secondTranslation = () => {
      const d = (lastSortedIndex - shortestBarIndex) * barWidth!;
      bars[shortestBarIndex].translateX!(bars[shortestBarIndex].translation + d);
    };

    setBars(arr => {
      firstTranslation();
      secondTranslation();
      [arr[lastSortedIndex], arr[shortestBarIndex]] = [shortestBar, sortedBar];
      return arr;
    });

    setLastSortedIndex(x => x + 1);
  }, [lastSortedIndex, setLastSortedIndex, setBars]);

  const sort = () => setLastSortedIndex(0);

  useEffect(() => {
    if (isSorting) sort();
  }, [isSorting]);

  return <Bars items={barsCopy} ref={barsRef} />;
}

export default SelectionSort;
