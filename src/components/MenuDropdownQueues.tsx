import React, { useState, useRef, useEffect } from 'react';
import useQueues from '../hooks/useQueues';

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  // const [listQueues, setListQueues] = useState(["Fila 1", "Fila 2", "Fila 3", "Fila 4"]);
  const dropdownRef = useRef(null);

  const { queue, queues, setQueues, listQueues } = useQueues();

  useEffect(() => {
    listQueues();
  }
  , []);


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-dropdown-button px-4 py-2 text-purple bg-white rounded hover:bg-purple-200 focus:outline-none"
      >
        Filas
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white rounded shadow-xl">
          {queues.map((item, index) => (
            <a
              key={item.name}
              href="#"
              className="menu-dropdown-item text-left block px-4 py-2 text-purple hover:bg-gray-100"
            >
              <label>
                <input type="checkbox" className="mr-2" checked={checked} />
              {item.name}
              </label>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
