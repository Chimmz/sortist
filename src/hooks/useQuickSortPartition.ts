import { useEffect, useState } from 'react';
import { BarClass } from '../types';

const useQuickSortPartition = function (this: BarClass[], start: number, end: number) {
  const [i, set_i] = useState(start);
  const [j, set_j] = useState(start);
  const [pivotIndex, setPivotIndex] = useState<number>();
  const [isPartitioning, setIsPartitioning] = useState(false);
  const [isPartitioned, setIsPartitioned] = useState(false);

  useEffect(() => {
    if (!isPartitioning) return;
  }, [isPartitioning]);

  const partition = function (this: { bars: BarClass[] }, start: number, end: number) {
    let pivotBar = this.bars[start];
    let [i, j] = [start, end + 1];

    while (i < j) {
      do {
        ++i;
        if (i > end || this.bars[i].height > pivotBar.height) break;
      } while (true);

      do {
        --j;
        if (this.bars[j].height <= pivotBar.height) break;
      } while (true);

      if (i < j) [this.bars[i], this.bars[j]] = [this.bars[j], this.bars[i]];
    }

    const pivotIndex = j;
    [this.bars[start], this.bars[j]] = [this.bars[j], this.bars[start]];

    // console.log(`After partitioning bars[${start} - ${end}]`, bars);
    return pivotIndex;
  };
};
