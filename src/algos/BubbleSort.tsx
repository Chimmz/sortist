import { useState, FC, useEffect, useMemo, useRef } from 'react';
import { BarClass, BarMovement, BarProps } from '../types';
import useAppContext from '../context/AppContext';
import useBarMovements from '../hooks/useBarMovements';
import useBar from '../hooks/useBar';
import Bar from '../components/bars/Bar';

const TOTAL_BARS = 150;

function BubbleSort() {
  const { isSorting: btnSortClicked, setIsSorting } = useAppContext();

  const barsRef = useRef<HTMLDivElement | null>(null);
  const { barWidth } = useBar(barsRef);
  const { barMovements, addBarMovement } = useBarMovements();

  const [passesTotal, setTotalPasses] = useState(-1);
  const [itr, setItr] = useState(-1);

  const [bars, setBars] = useState<BarClass[]>(() => {
    return Array.from(
      { length: TOTAL_BARS },
      (_, i) => new BarClass(undefined, undefined, undefined, i)
    );
    return [
      ['orangered', 80, 'orangered'],
      ['purple', 90, 'purple'],
      ['pink', 40, 'pink'],
      ['yellow', 70, 'yellow'],
      ['brown', 55, 'brown'],
      ['blue', 30, 'blue'],
      ['black', 20, 'black']
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  useEffect(() => {
    if (itr === -1) return; // If sort hasn't started
    // If itr has at least reached max iterations
    if (itr >= bars.length - 1 - passesTotal) return setTotalPasses(p => p + 1);

    const [currentBar, nextBar] = [bars[itr], bars[itr + 1]];

    // If two consecutive bars are imbalanced in height
    if (currentBar.height > nextBar.height) {
      // Switch bar positions
      setBars(arr => {
        [arr[itr], arr[itr + 1]] = [nextBar, currentBar];
        return arr;
      });

      // Animate switch in bar positions
      addBarMovement(currentBar.id, new BarMovement(itr, itr + 1));
      addBarMovement(nextBar.id, new BarMovement(itr + 1, itr));
      currentBar.moveToIndex!(itr + 1);
      nextBar.moveToIndex!(itr);
    }

    // Go to next bar within the same pass
    // setTimeout(() => setItr(i => i + 1), 100); // UNHIDE THIS LATER FOR SLOWER SPEEDS
    setItr(i => i + 1);
  }, [itr, bars]);

  useEffect(() => {
    if (passesTotal === -1) return; // If sort hasn't started
    // If max passes is reached
    if (passesTotal === bars.length - 1) return setIsSorting!(false);

    setItr(0); // Trigger an iteration from first bar
  }, [passesTotal, setItr]);

  // Start sorting by triggering a first pass
  const sort = () => setTotalPasses(0);

  useEffect(() => {
    if (btnSortClicked) sort();
  }, [btnSortClicked]);

  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2" ref={barsRef}>
      {/* Rendering a copy of original/un-manipulated array */}
      {barsCopy.map(b => (
        <Bar {...b} key={b.id} movs={barMovements[b.id]} />
      ))}
    </div>
  );
}

export default BubbleSort;
