import { useState } from 'react';
import { BarMovement } from '../types';

const useBarMovements = () => {
  const [barMovements, setBarMovements] = useState<{
    [barID: string]: BarMovement[] | undefined;
  }>({});

  const addBarMovement = (barID: string, movt: BarMovement) => {
    setBarMovements(state => {
      if (!state[barID]) state[barID] = [movt];
      else state[barID]!.push(movt);
      return state;
    });
  };

  return { barMovements, addBarMovement };
};

export default useBarMovements;
