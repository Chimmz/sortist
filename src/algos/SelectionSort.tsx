import { useState, FC, useEffect, useMemo, useRef } from 'react';
import { BarClass, BarMovement, BarProps } from '../types';
import useAppContext from '../context/AppContext';
import useBarMovements from '../hooks/useBarMovements';
import useBar from '../hooks/useBar';
import Bar from '../components/bars/Bar';

const TOTAL_BARS = 200;

function SelectionSort() {
  const [lastSortedIndex, setLastSortedIndex] = useState(-1);
  const { isSorting, setIsSorting } = useAppContext();

  const barsRef = useRef<HTMLDivElement | null>(null);
  const { barWidth } = useBar(barsRef);
  const { barMovements, addBarMovement } = useBarMovements();

  const [bars, setBars] = useState<BarClass[]>(() => {
    return Array.from(
      { length: TOTAL_BARS },
      (_, i) => new BarClass(undefined, undefined, undefined, i)
    );
    return [
      ['orangered', 80, 'orangered'],
      ['pink', 90, 'pink'],
      ['brown', 40, 'brown'],
      ['yellow', 30, 'yellow'],
      ['purple', 40, 'purple'],
      ['blue', 30, 'blue'],
      ['black', 20, 'black']
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  useEffect(() => {
    if (lastSortedIndex === -1) return; // If sort hasnt started
    // If max iterations is reached
    if (lastSortedIndex === bars.length - 2) return setIsSorting?.(false);

    let shortestBarIndex = lastSortedIndex;
    let shortestBar = bars[shortestBarIndex];

    for (let i = lastSortedIndex + 1; i < bars.length; i++) {
      if (bars[i].height > shortestBar.height) continue;
      shortestBar = bars[i];
      shortestBarIndex = i;
    }

    const lastSortedBar = bars[lastSortedIndex];

    // Switch bar positions
    setBars(arr => {
      [arr[lastSortedIndex], arr[shortestBarIndex]] = [shortestBar, lastSortedBar];
      return arr;
    });

    // Animate switch in bar positions
    addBarMovement(shortestBar.id, new BarMovement(shortestBarIndex, lastSortedIndex));
    addBarMovement(lastSortedBar.id, new BarMovement(lastSortedIndex, shortestBarIndex));
    shortestBar.moveToIndex!(lastSortedIndex);
    lastSortedBar.moveToIndex!(shortestBarIndex);

    // Go to next iteration
    setTimeout(() => setLastSortedIndex(i => i + 1), 200);
  }, [lastSortedIndex, setLastSortedIndex, setBars]);

  const sort = () => setLastSortedIndex(0);

  useEffect(() => {
    if (isSorting) sort();
  }, [isSorting]);

  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2" ref={barsRef}>
      {barsCopy.map(b => (
        <Bar {...b} key={b.id} movs={barMovements[b.id]} />
      ))}
    </div>
  );
}

export default SelectionSort;
