import { useState, useEffect } from "react";
import Queue from "../core/Queue";
import Button from "./Button";
import EntryInput from "./EntryInput";
import ColorPicker from "./ColorPicker"
import useQueues from "../hooks/useQueues"

interface FormProps {
  queue: Queue
  queueModified?: (queue: Queue) => void
  canceled?: () => void
}

export default function Form({ queue, canceled, queueModified }: FormProps) {
  const [name, setName] = useState(queue?.name ?? "");
  const [color, setColor] = useState(queue?.color ?? "#fff");
  const [greeting, setGreeting] = useState(queue?.greeting ?? "");

  const { saveQueue } = useQueues()

  const _id = queue?._id;
  const handleSubmit = () => {
    queueModified?.(new Queue(color, name, _id));
  };

  const handleOutsideClick = (queue) => {
    if (queue && queue._id) {
      saveQueue({ ...queue, color: color });
    }
  };

  useEffect(() => {
    setColor(queue?.color || "#fff");
  }, [queue]);

  console.log("Cor atual:", color);

  return (
    <form>
      {_id ? (
        <EntryInput
          text="ID"
          value={_id}
          readOnly
          className="mb-4 text-white"
        />
      ) : null}

      <EntryInput
        text="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-4 text-white"
      />
      <EntryInput
        text="Saudação"
        value={greeting}
        onChange={e => setName(e.target.value)}
        className="mb-4 text-white"
      />
      <div className="flex flex-col mb-4 text-white">
        <label className="mb-2">
          Cor:
          <ColorPicker color={color} onChange={setColor} onOutsideClick={() => handleOutsideClick(queue)} />
        </label>
      </div>
      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={handleSubmit}
        >
          {_id ? 'Alterar' : 'Salvar'}
        </Button>
        <Button onClick={canceled}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
