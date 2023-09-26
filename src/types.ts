import { algorithmNames } from './constants';
import { genRandomColor, genRandomNumber as genRandomHeight } from './utils/utils';
import { v4 as uuidv4 } from 'uuid';

export type AlgoNickname = keyof typeof algorithmNames;

// export interface BarProps {
//   readonly id: string;
//   readonly height: number;
//   color: string;
//   readonly initIndex: number;
//   currentIndex: number;
// }

export class BarClass {
  public currentIndex;

  constructor(
    readonly id: string = uuidv4(),
    readonly height: number = genRandomHeight(15, 100),
    public color: string = genRandomColor(),
    readonly initIndex: number = 0,
    public alignment: 'top' | 'bottom' = 'bottom'
  ) {
    this.id = id;
    this.height = height;
    this.color = color;
    this.initIndex = initIndex;
    this.currentIndex = initIndex;
    this.alignment = alignment;
  }
  public changeColor?() {
    this.color = 'gray';
  }
  public align?(val: typeof this.alignment) {
    this.alignment = val;
  }
  public moveToIndex?(ind: number) {
    this.currentIndex = ind;
  }
}

export interface BarMovementType {
  from: number;
  to: number;
}

export class BarMovement implements BarMovementType {
  from: number;
  to: number;
  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }
}
