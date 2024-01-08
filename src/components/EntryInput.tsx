
import { InputHTMLAttributes } from "react";

interface EntryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

export default function EntryInput(props: EntryInputProps) {
  const { text, ...rest } = props;

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-2">{text}</label>
      <input
        {...rest}
        className={`
          border border-purple-500 rounded-md focus:outline-none
          bg-gray-50 px-4 py-2
          ${props.readOnly ? "" : "focus:bg-white"}
        `}
      />
    </div>
  );
}
