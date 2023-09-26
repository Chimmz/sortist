import { useState, FC, useEffect, useMemo, useRef } from 'react';
import { BarClass, BarMovement } from '../../types';
import useAppContext from '../../context/AppContext';
import useBarMovements from '../../hooks/useBarMovements';
import useBar from '../../hooks/useBar';
import Bar from '../bars/Bar';
import { genBars } from '../../utils/utils';

const TOTAL_BARS = 50;

function BubbleSort() {
  const { isSorting: btnSortClicked, setIsSorting } = useAppContext();

  const { barMovements, addBarMovement } = useBarMovements();

  const [passesTotal, setTotalPasses] = useState(-1);
  const [itr, setItr] = useState(-1);

  const [bars, setBars] = useState<BarClass[]>(genBars.bind(null, TOTAL_BARS, 'bottom'));
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
    <div className="bars d-flex align-items-end flex-grow-1 px-2">
      {/* Rendering a copy of original/un-manipulated array */}
      {barsCopy.map(b => (
        <Bar {...b} key={b.id} movs={barMovements[b.id]} />
      ))}
    </div>
  );
}

export default BubbleSort;
