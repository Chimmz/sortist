import { useEffect, useState } from 'react';
import useAppContext from '../context/AppContext';
import useBarMovements from '../hooks/useBarMovements';
import { BarClass, BarMovement } from '../types';
import Bar from '../components/bars/Bar';

function InsertionSort() {
  const { isSorting, setIsSorting, isSorted, setIsSorted } = useAppContext();
  const { barMovements, addBarMovement } = useBarMovements();

  const [ptr, setPtr] = useState<number>(0);
  const [backwardPtr, setBackwardPtr] = useState<number>(0);

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
      // @ts-ignore
    ].map((obj, i) => new BarClass(...obj, i));
  });
  const [barsCopy, setBarsCopy] = useState<BarClass[]>(bars.slice());

  useEffect(() => {
    if (!ptr) return;
    const currentBar = bars[ptr];

    if (bars[backwardPtr].height > currentBar.height && backwardPtr >= 0) {
      console.log('In if-statement');

      setBars(arr => {
        arr[backwardPtr + 1] = arr[backwardPtr];
        return arr;
      });
      addBarMovement(
        bars[backwardPtr + 1].id,
        new BarMovement(backwardPtr + 1, backwardPtr)
      );
      bars[backwardPtr + 1].moveToIndex!(backwardPtr);

      setBackwardPtr(p => p! + 1);
    }

    setBars(arr => {
      arr[backwardPtr + 1] = currentBar;
      return arr;
    });
    addBarMovement(bars[backwardPtr + 1].id, new BarMovement(backwardPtr + 1, ptr));
    bars[backwardPtr + 1].moveToIndex!(ptr);
  }, [backwardPtr, ptr]);

  useEffect(() => {
    if (!ptr || ptr >= bars.length) return;
    setBackwardPtr(ptr - 1);
  }, [ptr]);

  const sort = () => setPtr(1);

  useEffect(() => {
    if (isSorting) sort();
  }, [isSorting]);

  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2">
      {barsCopy.map(b => (
        <Bar {...b} key={b.id} movs={barMovements[b.id]} />
      ))}
    </div>
  );
}

export default InsertionSort;
