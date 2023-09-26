import { useCallback, useEffect, useState } from 'react';
import useAppContext from '../../context/AppContext';
import useBarMovements from '../../hooks/useBarMovements';
import { BarClass, BarMovement } from '../../types';
import Bar from '../bars/Bar';
import { genBars } from '../../utils/utils';

const TOTAL_BARS = 100;

function InsertionSort() {
  const { isSorting, setIsSorting, isSorted, setIsSorted } = useAppContext();
  const { barMovements, addBarMovement } = useBarMovements();

  const [bars, setBars] = useState<BarClass[]>(() => {
    return genBars(TOTAL_BARS);
    return [
      ['orangered', 80, 'orangered'],
      ['black', 70, 'black'],
      ['brown', 40, 'brown'],
      ['purple', 55, 'purple']
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  const [i, set_i] = useState<number>(0);

  const sortBar = useCallback(
    (currentBar: BarClass, currentIndex: number, prevIndex: number) => {
      const previousBar = bars[prevIndex];

      // Recursion base case
      if (prevIndex < 0 || previousBar.height <= currentBar.height) {
        setBars(arr => {
          arr[prevIndex + 1] = currentBar;
          return arr;
        });
        set_i(i => i + 1);
        return;
      }

      // Shift
      setBars(arr => {
        // arr[prevIndex + 1] = arr[prevIndex];
        arr[prevIndex + 1] = previousBar;
        // arr[prevIndex] = nextBar;
        return arr;
      });

      setTimeout(sortBar.bind(null, currentBar, currentIndex - 1, prevIndex - 1), 10);
    },
    [i]
  );

  useEffect(() => {
    if (i > 0 && i < bars.length) sortBar(bars[i], i, i - 1);
    else setIsSorting!(false);
  }, [i]);

  const sort = () => set_i(1);

  useEffect(() => {
    if (isSorting) sort();
  }, [isSorting]);

  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2">
      {bars.map(b => (
        <Bar {...b} key={b.id} movs={barMovements[b.id]} />
      ))}
    </div>
  );
}

export default InsertionSort;
