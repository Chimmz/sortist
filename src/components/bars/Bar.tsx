import { useState, useEffect, useMemo } from 'react';
import styles from './Bar.module.css';
import cls from 'classnames';
import { BarClass, BarMovement, BarProps } from '../../types';

function Bar(props: BarClass) {
  const [displacement, setDisplacement] = useState(0);

  return (
    <div
      className={cls(styles.bar, 'flex-grow-1')}
      style={{
        color: 'white',
        height: `${props.height}%`,
        backgroundColor: props.color,
        transform: `translateX(${props.translation}px)`
      }}
    ></div>
  );
}

export default Bar;
