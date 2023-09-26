import { useState } from 'react';

const useQuickSort = function () {
  const [boundaries, setBoundaries] = useState<[number, number]>();

  return {
    setBoundaries
  };
};

export default useQuickSort;
