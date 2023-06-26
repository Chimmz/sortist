import { useState } from 'react';
import { AlgoNickname, BarMovement, BarProps } from '../types';
import algos from '../algos';

interface UseSortParams {
  sortType: AlgoNickname;
  bars: BarProps[];
  onSorting?: () => void;
  onSorted?: () => void;
}

const useSort = function ({ bars, sortType }: UseSortParams) {
  const sortFn = algos.get(sortType)!;

  const [barMovements, setBarMovements] = useState<{ [barId: string]: BarMovement[] }>({});
  const [sortStatus, setSortStatus] = useState<'not_sorted' | 'sorting' | 'sorted'>(
    'not_sorted'
  );

  const addMovement = (barId: string, movt: BarMovement) => {
    setBarMovements(state => {
      if (state[barId]) state[barId].push(movt);
      else state[barId] = [movt];
      return state;
    });
  };

  const sort = () => {
    if (['sorting', 'sorted'].includes(sortStatus)) return;

    console.log('Sorting()...');
    const opts = {
      addMovement,
      onSortStart: setSortStatus.bind(null, 'sorting')
      // onSortFinish: setSortStatus.bind(null, 'sorted')
    };
    sortFn(bars, opts);
  };

  return { sort, barMovements, sortStatus, setSortStatus };
};

export default useSort;
