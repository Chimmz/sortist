import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
import { algorithmNames } from '../constants';
import { AlgoNickname, BarClass, BarMovement, BarProps } from '../types';

interface AppContextData {
  activeAlgoName: AlgoNickname;
  setActiveAlgoName?: React.Dispatch<SetStateAction<keyof typeof algorithmNames>>;
  isSorting: boolean;
  setIsSorting?: React.Dispatch<SetStateAction<boolean>>;
  // btnSortClicked: boolean;
  // setBtnSortClicked?: React.Dispatch<SetStateAction<boolean>>;
}

const appContext = createContext<AppContextData>({
  activeAlgoName: 'SELECTION_SORT',
  isSorting: false
  // btnSortClicked: false
});

export const AppContextProvider = (props: { children: ReactNode }) => {
  const [activeAlgoName, setActiveAlgoName] =
    useState<keyof typeof algorithmNames>('SELECTION_SORT');

  const [btnSortClicked, setBtnSortClicked] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  return (
    <appContext.Provider
      value={{
        activeAlgoName,
        setActiveAlgoName,
        isSorting,
        setIsSorting
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
