
import { InputHTMLAttributes } from "react";

interface EntryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

export default function EntryInputSearch(props: EntryInputProps) {
  const { text, ...rest } = props;

  return (
    <div className={`flex flex-col ${props.className}`}>
      <input
        {...rest}
        className={`
          border border-purple-500 rounded-md focus:outline-none
          input-form px-4 py-2
          ${props.readOnly ? "" : "focus:bg-white"}
        `}
        placeholder={text}
      />
    </div>
  );
}
