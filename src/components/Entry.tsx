import { InputHTMLAttributes } from "react"

interface EntryProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
}

export default function Entry({ text, type = 'text', ...props }: EntryProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-2">
        {text}
      </label>
      {type === 'checkbox' ? (
        <input
          type="checkbox"
          {...props}
          className="form-checkbox h-5 w-5 text-purple-600"
        />
      ) : (
        <input
          type={type}
          {...props}
          className={`
                    border border-purple-500 rounded-md focus:outline-none
                    bg-gray-50 px-4 py-2
                    ${props.readOnly ? '' : 'focus:bg-white'}
                `}
        />
      )}
    </div>
  );
}

