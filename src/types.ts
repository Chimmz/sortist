import { algorithmNames } from './constants';
import { genRandomColor, genRandomNumber as genRandomHeight } from './utils/utils';
import { v4 as uuidv4 } from 'uuid';

export type AlgoNickname = keyof typeof algorithmNames;

export interface BarMovementObj {
  prevIndex: number;
  newIndex: number;
}

export interface BarProps {
  readonly id: string;
  readonly height: number;
  readonly color: string;
  readonly translation: number;
  translateX?: (displacement: number) => void;
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
    readonly id: string = uuidv4(),
    readonly height: number = genRandomHeight(15, 100),
    readonly color: string = genRandomColor(),
    public translation: number = 0
  ) {
    this.id = id;
    this.height = height;
    this.color = color;
    this.translation = translation;
  }
  public translateX?(displacement: number) {
    this.translation = this.translation + displacement;
  }
}

export class BarMovement implements BarMovementObj {
  prevIndex: number;
  newIndex: number;

  constructor(prevIndex: number, newIndex: number) {
    this.prevIndex = prevIndex;
    this.newIndex = newIndex;
  }
}
