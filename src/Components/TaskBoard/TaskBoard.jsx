import React, { useContext } from "react";
import { ModalState, TasksContext } from "../../Context/Index";
import TaskList from "./TaskList";
import TaskSearch from "./TaskSearch";

export default function TaskBoard({}) {
  const { setModalState } = useContext(ModalState);
  const { state, dispatch, search, searchText } = useContext(TasksContext);
  let tasksToRender = state;

  if (searchText.length > 0) {
    tasksToRender = search;
  }

  return (
    <section className="mb-20" id="tasks">
      <div className="container mx-auto">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <TaskSearch />
          </div>
          <div className="overflow-auto"> {tasksToRender.length > 0 ? <TaskList tasks={tasksToRender} /> : <p className="text-center text-gray-400">No tasks found</p>}</div>
        </div>
      </div>
    </section>
  );
}
