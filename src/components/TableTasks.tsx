import { useState, MutableRefObject, useRef, useEffect } from "react"
import Task from "../core/Task"
import { IconEdit, IconThrash } from "./Icons"
import styled from 'styled-components';
import useTasks from "../hooks/useTasks";

interface TableProps {
  tasks: Task[]
  taskSelected?: (task: Task) => void
  taskDeleted?: (task: Task) => void
  listTasks?: () => void
  showCheckboxes?: boolean
  showActions?: boolean
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CursorPointerCheckbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;
const API_URL = "http://137.184.81.207:9000";

export default function Table({
  tasks, taskSelected, taskDeleted, listTasks, showCheckboxes, showActions = true, onSelectionChange 
}: TableProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const taskRefs = useRef({});

  const { saveTask, setTasks } = useTasks();
  
  const confirmAndDelete = (user) => {
    setCurrentTask(user);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (currentTask) {
      taskDeleted?.(currentTask);
      console.log("Tarefa excluída:", currentTask);
    }
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (task) => {
    slideUpEffect(task._id);

    setTimeout(() => {
      const updatedTask = { ...task, isActive: false };
      // saveTask(updatedTask);
      const tasksList = tasks.filter(t => t._id !== task._id);
      setTasks(tasksList);
    }, 500);
  };
  


  const slideUpEffect = (taskId) => {
    const taskRow = taskRefs.current[taskId];
    if (taskRow) {
      taskRow.classList.add('slide-up');

      // Adicionar ouvinte para o fim da animação
      taskRow.addEventListener('animationend', () => {
        const tasksList = tasks.filter(t => t._id !== taskId);
        setTasks(tasksList); // Atualizar o estado após a animação
      }, { once: true }); // Garantir que o evento seja removido após ser acionado
    }
  };

  useEffect(() => {
    taskRefs.current = {};
    tasks.forEach(task => {
      taskRefs.current[task._id] = null;
    });
  }, [tasks]);

  const Modal = ({ onClose, onConfirm, task }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <p>Tem certeza que deseja excluir a mensagem {task?.title}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={onConfirm}
            >
              Excluir
            </button>
            <button
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white
              px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  function renderHeader() {
    return (
      <tr>
        {showCheckboxes && <th className="text-center p-4 w-1/10">Selecionar</th>}
        <th className="text-left p-4">Tarefa</th>
        {showActions ? <th className="p-4 w-1/8">Ações</th> : false}
      </tr>
    )
  }

  function renderData() {
    return tasks?.map((task, i) => {
      const ref = el => {
        if (el) {
          taskRefs.current[task._id] = el;
        }
      };

      return (
        <tr ref={ref} key={task._id} 
        className={`text-black ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}
        onClick={() => handleCheckboxChange(task)}
        style={{ cursor: 'pointer' }}
        >
          {showCheckboxes && (
            <td className="text-center p-4 w-1/10">
              <CursorPointerCheckbox
                  type="checkbox"
                  className="cursorPointer"
                  checked={selectedTask?._id === task._id}
                  onChange={() => handleCheckboxChange(task)}
              />
            </td>
          )}
          <td className="text-left p-4">{task.text}</td>
          {showActions ? renderActions(task) : false}
        </tr>
      )
    })
  }

  function renderActions(task: Task) {
    return (
      <td className="flex justify-center">
        {taskSelected ? (
          <button onClick={() => taskSelected?.(task)} className={`
                    flex justify-right items-right
                    text-green-600 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconEdit}
          </button>
        ) : false}
        {taskDeleted ? (
          <button onClick={() => confirmAndDelete(task)} className={`
                    flex justify-right items-right
                    text-red-500 rounded-md p-2 m-1
                    hover:bg-purple-50
                `}>
            {IconThrash}
          </button>
        ) : false}
      </td>
    )
  }

  return (
    <div>
      <table className="w-full rounded-md overflow-hidden">
        <thead className={`
          text-gray-100
          bg-gradient-to-r from-purple-500 to-purple-800
      `}>
          {renderHeader()}
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          task={currentTask}
        />
      )}
    </div>
  )
}