import { algorithmNames } from './constants';
import { genRandomColor, genRandomNumber as genRandomHeight } from './utils/utils';
import { v4 as uuidv4 } from 'uuid';

export type AlgoNickname = keyof typeof algorithmNames;

export interface BarMovementObj {
  prevIndex: number;
  newIndex: number;
}

export interface BarProps {
  id: string;
  height: number;
  color: string;
}

export type Algo = (
  bars: BarProps[],
  opts: {
    addMovement: (barId: string, movt: BarMovement) => void;
    onSortStart?(): void;
    onSortFinish?(): void;
  }
) => any;

export class BarClass implements BarProps {
  constructor(
    public height: number = genRandomHeight(15, 100),
    public color: string = genRandomColor(),
    readonly id: string = uuidv4()
  ) {
    this.id = id;
    this.height = height;
    this.color = color;
  }
}

export class BarMovement implements BarMovementObj {
  prevIndex: number;
  newIndex: number;

  constructor(movt: [prevIndex: number, newIndex: number]) {
    this.prevIndex = movt[0];
    this.newIndex = movt[1];
  }
}
