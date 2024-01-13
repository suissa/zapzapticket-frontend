import React, { useState, InputHTMLAttributes, ChangeEventHandler } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

interface CalendarInputProps {
  onChange?: (date: Date) => void; // Função para lidar com mudança de data
  text: string;
  selected: Date; // Data selecionada
  className?: string; // Classe CSS opcional
}

const CalendarInput = ({ text, selected, onChange, className }: CalendarInputProps) => {
  // console.log("selected", selected);
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-2 flex items-center gap-2">
        {text}
        <DatePicker 
          selected={new Date(selected)} 
          onChange={onChange}
          className="border border-purple-500 rounded-md focus:outline-none input-form px-4 py-2"
        />
      </label>
    </div>
  );
};

export default React.memo(CalendarInput);