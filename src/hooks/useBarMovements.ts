import { useState } from 'react';
import { BarMovement } from '../types';

const useBarMovements = () => {
  const [state, setState] = useState<{
    [barID: string]: BarMovement[] | undefined;
  }>({});

  const doesBarHaveMovements = (barId: string) => !!state[barId];

  const addBarMovement = (barId: string, movt: BarMovement) => {
    setState(movements => {
      if (!doesBarHaveMovements(barId)) movements[barId] = [movt];
      else movements[barId]!.push(movt);
      return movements;
    });
  };

  return { barMovements: state, addBarMovement };
};

export default useBarMovements;
