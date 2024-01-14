export default function EntryInput(props: EntryInputProps) {
  const { text, ...rest } = props;
  const inputId = rest.id || 'entry-input'; // Gerar um ID único ou usar um fornecido

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label htmlFor={inputId} className="mb-2">{text}</label>
      <input
        id={inputId}
        {...rest}
        className={`
          border border-purple-500 rounded-md focus:outline-none
          input-form px-4 py-2
          ${props.readOnly ? "" : "focus:bg-white"}
        `}
      />
    </div>
  );
}
