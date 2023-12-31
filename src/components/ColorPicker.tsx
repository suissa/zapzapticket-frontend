import React, { useState } from 'react';
import { BlockPicker } from 'react-color';

const ColorPicker = () => {
  const [color, setColor] = useState("#fff");
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div 
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: color,
          cursor: 'pointer',
          position: 'relative',
          left: '0',
          borderRadius: '4px'
        }}
        onClick={() => setShowPicker(show => !show)}
      />
      {showPicker && (
        <div style={{ position: 'absolute', zIndex: 99999, top: '40px', left: '-70px' }}>
          <BlockPicker
            color={color}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
