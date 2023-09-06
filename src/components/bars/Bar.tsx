import { useState, useEffect, useMemo } from 'react';
import styles from './Bar.module.css';
import cls from 'classnames';
import { BarClass, BarMovement, BarProps } from '../../types';

type Props = BarClass & { movs: BarMovement[] | undefined };

function Bar(props: Props) {
  const [displacement, setDisplacement] = useState(0);
  const { movs } = props;

  useEffect(() => {
    if (!movs) return;

    const latestMov = movs.slice(-1).pop()!;
    setDisplacement(latestMov.to - props.initIndex);
  }, [movs, setDisplacement, props.currentIndex]);

  const translateX = useMemo(() => `translateX(${displacement * 100}%)`, [displacement]);

  return (
    <div
      className={cls(styles.bar, 'flex-grow-1')}
      style={{
        color: 'white',
        height: `${props.height}%`,
        backgroundColor: props.color,
        transform: translateX
      }}
    ></div>
  );
}

export default Bar;
