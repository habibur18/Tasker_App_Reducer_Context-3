import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ModalState, TasksContext } from "../../Context/Index";

export default function TaskModal() {
  const { setModalState } = useContext(ModalState);
  const { dispatch, updatedTask, setUpdatedTask } = useContext(TasksContext);
  const [formData, setFormData] = useState(
    updatedTask || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorite: false,
    }
  );
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setModalState(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setModalState]);
  const handleInput = (event) => {
    let { name, value } = event.target;
    if (name === "tags") {
      value = value.split(",");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (updatedTask) {
      dispatch({ type: "EDIT_TASK", payload: formData });
      setUpdatedTask(null);
      toast.success("Task updated successfully");
    } else {
      dispatch({ type: "ADD_TASK", payload: formData });
      toast.success("Task added successfully");
    }
    setModalState(false);
    setUpdatedTask(null);
  };
  console.log(formData.priority);
  return (
    <div className="fixed inset-0 z-50 bg-slate-800/80">
      <form onSubmit={handleSubmit} ref={ref} className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">{updatedTask ? "Update Task" : "Add Task"}</h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input value={formData.title} onChange={handleInput} className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5" type="text" name="title" id="title" required />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea value={formData.description} onChange={handleInput} className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]" type="text" name="description" id="description" required></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input value={formData.tags} onChange={handleInput} className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5" type="text" name="tags" id="tags" required />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select value={formData.priority.toLowerCase()} onChange={handleInput} className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5" name="priority" id="priority" required>
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20">
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80">
            Create new Task
          </button>
        </div>
      </form>
    </div>
  );
}
