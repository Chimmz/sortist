import { useState, useEffect, useMemo } from 'react';
import styles from './Bar.module.css';
import cls from 'classnames';
import { BarMovement, BarProps } from '../types';

const Bar = (props: BarProps & { width: number | undefined; movements: BarMovement[] }) => {
  const [displacement, setDisplacement] = useState(0);

  useEffect(() => {
    if (!props.movements?.length) return;

    // console.log(`Movements for ${props.id}: `, props.movements);
    // props.movements.forEach(mov => {
    //   const { prevIndex, newIndex } = mov;
    //   setTimeout(() => {
    //   setDisplacement(newIndex - prevIndex);
    //   }, 500);
    // });
    const { prevIndex, newIndex } = props.movements.slice(-1).pop()!;
    setDisplacement(newIndex - prevIndex);
  }, [props.movements]);

  const barStyles = useMemo(() => {
    return {
      height: `${props.height}%`,
      backgroundColor: props.color,
      transform: !props.width ? 'none' : `translateX(${displacement * props.width!}px)`
    };
  }, [displacement, props.width]);

  return <div className={cls(styles.bar, 'flex-grow-1')} style={barStyles}></div>;
};

export default Bar;
