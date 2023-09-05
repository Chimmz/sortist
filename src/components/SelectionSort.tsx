import { useState, FC, useEffect, useMemo, useRef } from 'react';
import Bars from './bars/Bars';
import { BarClass, BarMovement, BarProps } from '../types';
import useAppContext from '../context/AppContext';
import useBarMovements from '../hooks/useBarMovements';
import useBar from '../hooks/useBar';
import Bar from './bars/Bar';

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
      ['black', 20, 'black'],
      ['ngered', 80, 'orangered'],
      ['k', 90, 'pink'],
      ['wn', 30, 'brown'],
      ['low', 85, 'yellow'],
      ['ple', 40, 'purple'],
      ['e', 40, 'blue'],
      ['ck', 20, 'black'],
      ['brwn', 30, 'brown'],
      ['yllow', 85, 'yellow'],
      ['purpe', 40, 'purple']
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  useEffect(() => {
    if (lastSortedIndex < 0) return;

    const maxIterationReached = lastSortedIndex === bars.length - 2;
    if (maxIterationReached) return setIsSorting?.(false);

    let shortestBarIndex = lastSortedIndex;
    let shortestBar = bars[shortestBarIndex];

    console.log(`I thought ${bars[lastSortedIndex].color} was the shortest`);

    for (let i = lastSortedIndex + 1; i < bars.length; i++) {
      if (bars[i].height > shortestBar.height) continue;
      shortestBar = bars[i];
      shortestBarIndex = i;
    }
    console.log(`I realised ${shortestBar.color} was the actual shortest`);

    const lastSortedBar = bars[lastSortedIndex];

    addBarMovement(shortestBar.id, new BarMovement(shortestBarIndex, lastSortedIndex));
    addBarMovement(lastSortedBar.id, new BarMovement(lastSortedIndex, shortestBarIndex));
    shortestBar.moveToIndex!(lastSortedIndex);
    lastSortedBar.moveToIndex!(shortestBarIndex);

    setBars(arr => {
      [arr[lastSortedIndex], arr[shortestBarIndex]] = [shortestBar, lastSortedBar];
      return arr;
    });

    setTimeout(() => setLastSortedIndex(i => i + 1), 1005);
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

  // return <Bars items={bars} ref={barsRef} movements={barMovements}/>;
}

export default SelectionSort;
