import { useMemo, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { Icon } from '@iconify/react';
import { algorithmNames } from '../constants';
import useAppContext from '../context/AppContext';

const Navbar = function () {
  const { currentAlgo, setCurrentAlgo, isSorting, setIsSorting } = useAppContext();

  return (
    <nav className="options d-flex align-items-center px-5 pt-2 flex-grow-1">
      <div className="fw-bold fs-4 text-uppercase me-auto">
        <span className="color-pry">S</span>ortist
      </div>

      <div className="settings d-flex gap-5">
        <DropdownButton
          title={
            algorithmNames[currentAlgo as keyof typeof algorithmNames] || 'Choose algorithm'
          }
          variant="none"
        >
          {Object.entries(algorithmNames)
            .sort()
            .map(([algoKey, algoName]) => (
              <Dropdown.Item
                key={algoKey}
                className="text-black"
                onClick={() => setCurrentAlgo?.(algoKey as keyof typeof algorithmNames)}
              >
                {algoName}
              </Dropdown.Item>
            ))}
        </DropdownButton>

        <div className="d-flex gap-2">
          <Form.Label style={{ minWidth: 'max-content' }}>Sort speed</Form.Label>
          <Form.Range />
        </div>
      </div>

      <div className="actions d-flex align-items-center gap-2 ms-auto">
        <button
          className="btn btn-pry"
          // onClick={setBtnSortClicked?.bind(null, true)}
          onClick={setIsSorting?.bind(null, true)}
          disabled={isSorting}
        >
          <Icon
            icon={isSorting ? 'carbon:pause-filled' : 'ph:play-fill'}
            width={isSorting ? 18 : 13}
          />
          Start sorting
        </button>
        <button className="btn btn-pry-outline">Compare algorithms</button>
      </div>
    </nav>
  );
};

export default Navbar;
