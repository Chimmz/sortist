import { LegacyRef, forwardRef } from 'react';
import { BarClass } from '../../types';
import Bar from './Bar';

interface Props {
  items: BarClass[];
  ref: LegacyRef<HTMLDivElement> | undefined;
}

const Bars = forwardRef<HTMLDivElement | null, Props>(function (props, ref) {
  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2" ref={ref}>
      {props.items.map(b => (
        <Bar {...b} key={b.id} />
      ))}
    </div>
  );
});
export default Bars;
