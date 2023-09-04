import { LegacyRef, Ref, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { BarMovement } from '../types';

const useBar = (barsRef: RefObject<HTMLDivElement | null>) => {
  const [barWidth, setBarWidth] = useState<number>();
  // const barsRef = useRef<HTMLDivElement | null>(null);

  const getBarWidth = useCallback(() => {
    return barsRef.current?.firstElementChild?.getBoundingClientRect().width;
  }, [barsRef]);

  useEffect(() => {
    setBarWidth(getBarWidth()); // Instead of an extra useEffect with no deps

    const listener = () => setBarWidth(getBarWidth());
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  return {
    barWidth
  };
};

export default useBar;
