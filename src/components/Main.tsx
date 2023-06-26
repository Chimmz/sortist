import useAppContext from '../context/AppContext';
import Bars from './Bars';

const Main = function () {
  const { activeAlgoName, setIsSorting, btnSortClicked } = useAppContext();

  return (
    <main className="bg-white flex-grow-1" style={{}}>
      <Bars
        barsCount={500}
        sortAlgo={activeAlgoName}
        onSorting={setIsSorting?.bind(null, true)}
        onSorted={setIsSorting?.bind(null, false)}
        shouldSort={btnSortClicked}
      />
    </main>
  );
};

export default Main;
