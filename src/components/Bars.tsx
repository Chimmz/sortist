import { FC, useState, useEffect, useMemo, useRef } from 'react';

import { AlgoNickname, BarClass, BarProps } from '../types';
import Bar from './Bar';
import useSort from '../hooks/useSort';

interface Props {
  barsCount: number;
  sortAlgo: AlgoNickname;
  shouldSort: boolean;
  onSorting?: () => void;
  onSorted?: () => void;
}

const getBarWidth = (parentEl: HTMLDivElement) => {
  // console.log({ parentEl });
  return (parentEl?.firstElementChild as HTMLDivElement | undefined)?.getBoundingClientRect()
    .width;
};

const Bars: FC<Props> = function (props) {
  const [barWidth, setBarWidth] = useState<number>();
  const barsRef = useRef<HTMLDivElement | null>(null);

  const bars: BarProps[] = useMemo(() => {
    // return Array.from({ length: props.barsCount }, () => new BarClass());
    return [
      { height: 80, color: 'purple', id: '1' },
      { height: 40, color: 'green', id: '2' },
      { height: 55, color: 'brown', id: '3' }
    ];
  }, []);
  const { sort, barMovements, sortStatus } = useSort({ bars, sortType: props.sortAlgo });

  useEffect(() => {
    setBarWidth(getBarWidth(barsRef.current!));
  }, []);

  useEffect(() => {
    const listener = () => setBarWidth(getBarWidth(barsRef.current!));
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  useEffect(() => {
    if (!props.shouldSort) return;
    sort();
  }, [props.shouldSort]);

  useEffect(() => {
    (sortStatus === 'sorting' ? props.onSorting : props.onSorted)?.();
  }, [sortStatus]);

  return (
    <>
      <div className="bars d-flex align-items-end flex-grow-1 px-2" ref={barsRef}>
        {bars.map(b => (
          <Bar {...b} key={b.id} width={barWidth} movements={barMovements[b.id]} />
        ))}
      </div>
    </>
  );
};
export default Bars;
