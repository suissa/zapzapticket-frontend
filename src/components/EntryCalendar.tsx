import React, { useState, InputHTMLAttributes, ChangeEventHandler } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

interface EntryCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  text: string;
  selected: Date;
  className?: string;
}

const CalendarInput = ({ text, selected, onChange, className }: EntryCheckboxProps) => {
  console.log("selected", selected);
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-2 flex items-center gap-2">
        {text}
        <DatePicker 
          selected={selected} 
          onChange={onChange}
          className="border border-purple-500 rounded-md focus:outline-none input-form px-4 py-2"
        />
      </label>
    </div>
  );
};

export default React.memo(CalendarInput);