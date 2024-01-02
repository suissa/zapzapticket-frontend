import React, { useState } from 'react';

const ToggleSwitch = ({on = true}) => {
  const [isOn, setIsOn] = useState(on);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div onClick={toggleSwitch} className={`margin-0-auto cursor-pointer w-10 h-3 flex items-center bg-gray-300 rounded-full  duration-300 ${isOn ? 'bg-purple-400' : ''}`}>
      <div className={`bg-purple-600 w-4 h-4 rounded-full shadow-md transform duration-300 ${isOn ? 'translate-x-6' : ''}`}></div>
    </div>
  );
};

export default ToggleSwitch;
