import { useMemo } from 'react';

import useAppContext from '../context/AppContext';
import SelectionSort from './SelectionSort';
import BubbleSort from './BubbleSort';

const Main = function () {
  const { currentAlgo } = useAppContext();

  const content = useMemo(() => {
    switch (currentAlgo) {
      case 'BUBBLE_SORT':
        return <BubbleSort />;
      case 'SELECTION_SORT':
        return <SelectionSort />;
    }
  }, [currentAlgo]);

  return <main className="bg-white flex-grow-1">{content}</main>;
};

export default Main;
