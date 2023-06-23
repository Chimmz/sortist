import { FC, useMemo } from 'react';
import Bar, { BarProps } from './Bar';
import { v4 as uuidv4 } from 'uuid';
import {
  genRandomBarColor,
  genRandomNumber as genRandomBarHeight
} from '../utils/numberUtils';
import { algorithmNames } from '../constants';

interface Props {
  // algo: number;
}

const Bars: FC<Props> = function (props) {
  const bars: BarProps[] = useMemo(() => {
    return Array.from({ length: 140 }, () => ({
      height: genRandomBarHeight(15, 100),
      color: genRandomBarColor() as string,
      id: uuidv4()
    }));
  }, []);

  // const algorithm = algorithmNames

  return (
    <div className="bars d-flex align-items-end flex-grow-1 px-2">
      {bars.map((b, i, arr) => {
        // let color = b.color;
        // let neighboringColors: string[] = [];

        // if (i !== 0) neighboringColors.push(arr[i - 1].color);
        // if (i !== arr.length - 1) neighboringColors.push(arr[i + 1].color);

        // color = genRandomBarColor(neighboringColors);
        // console.log({ color }, neighboringColors);
        return <Bar height={b.height} color={b.color} id={b.id} key={b.id} />;
      })}
    </div>
  );
};
export default Bars;
