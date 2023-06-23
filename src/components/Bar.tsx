import { useMemo } from 'react';
import styles from './Bar.module.css';
import { genRandomBarColor } from '../utils/numberUtils';
import cls from 'classnames';

export interface BarProps {
  id: string;
  height: number;
  color: string;
}

const Bar = (props: BarProps) => {
  const barHeight = useMemo(() => `${props.height}%`, [props.height]);

  return (
    <div
      className={cls(styles.bar, 'flex-grow-1')}
      style={{ height: barHeight, backgroundColor: props.color }}
    ></div>
  );
};

export default Bar;
