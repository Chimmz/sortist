import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { algorithmNames } from '../constants';
import { AlgoNickname, BarClass, BarMovement, BarProps } from '../types';

interface AppContextData {
  currentAlgo: AlgoNickname;
  setCurrentAlgo?: React.Dispatch<SetStateAction<keyof typeof algorithmNames>>;
  isSorting: boolean;
  setIsSorting?: React.Dispatch<SetStateAction<boolean>>;
  isSorted: boolean;
  setIsSorted?: React.Dispatch<SetStateAction<boolean>>;
}

const appContext = createContext<AppContextData>({
  currentAlgo: 'INSERTION_SORT',
  isSorting: false,
  isSorted: false
  // btnSortClicked: false
});

export const AppContextProvider = (props: { children: ReactNode }) => {
  const [currentAlgo, setCurrentAlgo] =
    useState<keyof typeof algorithmNames>('INSERTION_SORT');

  const [btnSortClicked, setBtnSortClicked] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setIsSorting(false);
    setIsSorted(false);
  }, [currentAlgo]);

  return (
    <appContext.Provider
      value={{
        currentAlgo,
        setCurrentAlgo,
        isSorting,
        setIsSorting,
        isSorted,
        setIsSorted
        // btnSortClicked,
        // setBtnSortClicked
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

const useAppContext = () => useContext(appContext);
export default useAppContext;
