import { Algo, AlgoNickname } from '../types';
import selectionSort from './selectionSort';

const algos = new Map<AlgoNickname, Algo>([['SELECTION_SORT', selectionSort]]);

export default algos;
