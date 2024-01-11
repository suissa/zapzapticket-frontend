import React, { InputHTMLAttributes } from "react";

interface EntryCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const EntryCheckbox = ({ text, ...rest }: EntryCheckboxProps) => {
  return (
    <div className={`flex flex-col ${rest.className}`}>
      <label className="mb-2 flex items-center gap-2">
        {text}
        <input
          type="checkbox"
          {...rest}
          className={`
            border border-purple-500 rounded focus:outline-none
            cursor-pointer
          `}
        />
      </label>
    </div>
  );
};

export default React.memo(EntryCheckbox);
