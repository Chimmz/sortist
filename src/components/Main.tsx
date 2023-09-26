import { useMemo } from 'react';

import useAppContext from '../context/AppContext';
import SelectionSort from './algos/SelectionSort';
import BubbleSort from './algos/BubbleSort';
import QuickSort from './algos/QuickSort';
import InsertionSort from './algos/InsertionSort';
import QuickSort2 from './algos/QuickSort2';

const Main = function () {
  const { currentAlgo } = useAppContext();

  const content = useMemo(() => {
    switch (currentAlgo) {
      case 'BUBBLE_SORT':
        return <BubbleSort />;
      case 'SELECTION_SORT':
        return <SelectionSort />;
      case 'QUICK_SORT':
        return <QuickSort />;
      case 'INSERTION_SORT':
        return <InsertionSort />;
    }
  }, [currentAlgo]);

  return <main className="flex-grow-1">{content}</main>;
};

export default Main;
