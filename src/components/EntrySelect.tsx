import { SelectHTMLAttributes } from "react";

interface EntrySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  text: string;
  selectOptions: { value: string; label: string }[];
  readOnly?: boolean; // Adicione a propriedade readOnly opcional
}

export default function EntrySelect(props: EntrySelectProps) {
  const { text, selectOptions, ...rest } = props;
  console.log("selectOptions", selectOptions)
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-2">{text}</label>
      <select
        {...rest}
        className={`
          border border-purple-500 rounded-md focus:outline-none
          bg-gray-50 px-4 py-2
          ${props.readOnly ? "" : "focus:bg-white"}
        `}
      >
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
