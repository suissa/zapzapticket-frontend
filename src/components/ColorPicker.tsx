import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, onChange, onOutsideClick }) => {
  const [showPicker, setShowPicker] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPicker(false);
        onOutsideClick();
      }
    }

    // Adiciona o listener quando o componente é montado
    document.addEventListener('mousedown', handleClickOutside);

    // Limpa o listener quando o componente é desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]); // A dependência `ref` é desnecessária aqui e pode ser removida


  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div 
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: color,
          cursor: "pointer",
          position: "relative",
          left: "0",
          borderRadius: "4px"
        }}
        onClick={() => setShowPicker(show => !show)}
      />
      {showPicker && (
        <div style={{ position: "absolute", zIndex: 99999, top: "40px", left: "-70px" }}>
          <SketchPicker
            color={color}
            onChangeComplete={(color) => onChange(color.hex)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
