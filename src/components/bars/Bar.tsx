import { useState, useEffect, useMemo } from 'react';
import styles from './Bar.module.css';
import cls from 'classnames';
import { BarClass, BarMovement, BarProps } from '../../types';

type Props = BarClass & { movs: BarMovement[] | undefined };

function Bar(props: Props) {
  const [displacement, setDisplacement] = useState(0);
  const { movs } = props;
  // const translateX = useMemo(() => {
  //   const displacement = props.currentIndex - props.initIndex;
  //   return displacement;
  //   // return `${displacement * 269.734375}`;
  // }, [props.currentIndex]);

  useEffect(() => {
    if (!movs) return;
    const latestMov = movs.slice(-1).pop()!;
    // If mov's latest
    // if (latestMov?.newIndex === props.currentIndex) return;
    console.log(`New mov for ${props.color}: ${latestMov.from} to ${latestMov.to}`);
    console.log({
      'Mov destination': latestMov.to,
      currentIndex: props.currentIndex
    });
    setDisplacement(latestMov.to - props.initIndex);
  }, [movs, props.currentIndex]);

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
