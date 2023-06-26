import { useState, useEffect, useMemo } from 'react';
import styles from './Bar.module.css';
import cls from 'classnames';
import { BarMovement, BarProps } from '../types';

const Bar = (props: BarProps & { width: number | undefined; movements: BarMovement[] }) => {
  const [displacement, setDisplacement] = useState(0);

  useEffect(() => {
    if (!props.movements?.length) return;

    // Dividing by 2 because I noticed React does a weird repitition when adding a new movement
    const movements = props.movements.slice(props.movements.length / 2);

    // if (props.id == '1') {
    //   console.log(`movements for ${props.height}: `, movements);
    // }

    movements.forEach(movt => {
      const { prevIndex, newIndex } = movt;
      setDisplacement(state => state + (newIndex - prevIndex));
    });
  }, [props.movements]);

  const barStyles = useMemo(() => {
    return {
      color: 'white',
      height: `${props.height}%`,
      backgroundColor: props.color,
      transform: !props.width ? 'none' : `translateX(${displacement * props.width!}px)`
    };
  }, [displacement, props.width]);

  return <div className={cls(styles.bar, 'flex-grow-1')} style={barStyles}></div>;
};

export default Bar;
