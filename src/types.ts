import { algorithmNames } from './constants';
import { genRandomColor, genRandomNumber as genRandomHeight } from './utils/utils';
import { v4 as uuidv4 } from 'uuid';

export type AlgoNickname = keyof typeof algorithmNames;

export interface BarProps {
  readonly id: string;
  readonly height: number;
  readonly color: string;
  readonly initIndex: number;
  currentIndex: number;
}

export class BarClass implements BarProps {
  public currentIndex;

  constructor(
    readonly id: string = uuidv4(),
    readonly height: number = genRandomHeight(15, 100),
    readonly color: string = genRandomColor(),
    readonly initIndex: number = 0
  ) {
    this.id = id;
    this.height = height;
    this.color = color;
    this.initIndex = initIndex;
    this.currentIndex = initIndex;
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
