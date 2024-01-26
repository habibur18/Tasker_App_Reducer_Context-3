import React, { useContext, useState } from "react";
import { ModalState, TasksContext } from "../../Context/Index";

export default function Task({ task }) {
  const { id, title, description, tags, priority, isFavorite } = task;
  const { setModalState } = useContext(ModalState);
  const { state, dispatch, setUpdatedTask } = useContext(TasksContext);
  const [colors, setColors] = useState(null);
  const handleDeleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setColors(color);
  };
  const handleToggleTask = (taskId) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  };
  const handleUpdateTask = (task) => {
    setUpdatedTask(task);
    dispatch({ type: "EDIT_TASK", payload: task });
    setModalState(true);
  };
  return (
    <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
      <td onClick={() => handleToggleTask(id)} className="cursor-pointer">
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="yellow" fill="yellow" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="gray" fill="gray" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        )}
      </td>
      <td>{title}</td>
      <td>
        <div>{description}</div>
      </td>
      <td>
        <ul className="flex justify-center gap-1.5 flex-wrap">
          {tags?.map((tag, index) => (
            <li key={index}>
              <span className="inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]" style={{ backgroundColor: colors ? colors : getRandomColor() }}>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </td>
      <td className="text-center">{priority}</td>
      <td>
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => {
              handleDeleteTask(id);
            }}
            className="text-red-500"
          >
            Delete
          </button>
          <button onClick={() => handleUpdateTask(task)} className="text-blue-500">
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}
