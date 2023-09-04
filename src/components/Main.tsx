import useAppContext from '../context/AppContext';
import SelectionSort from './SelectionSort';
import Bars from './bars/Bars';

const Main = function () {
  const { activeAlgoName, setIsSorting } = useAppContext();

  return (
    <main className="bg-white flex-grow-1">
      <SelectionSort />
    </main>
  );
};

export default Main;
