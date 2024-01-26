import { useReducer, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import Navbar from "./Components/Navbar";
import TaskBoard from "./Components/TaskBoard/TaskBoard";
import TaskModal from "./Components/TaskBoard/TaskModal";
import { ModalState, TasksContext } from "./Context/Index";
import { initialState } from "./Data/Tasks";
import { TaskReducer } from "./Reducer/Reducer";

function App() {
  const [modalState, setModalState] = useState(false);
  const [state, dispatch] = useReducer(TaskReducer, initialState);
  const [updatedTask, setUpdatedTask] = useState(null);
  return (
    <>
      <ModalState.Provider value={{ modalState, setModalState }}>
        <TasksContext.Provider value={{ state, dispatch, updatedTask, setUpdatedTask }}>
          {modalState && <TaskModal needUpdate={updatedTask} />}
          <Navbar />
          <HeroSection />
          <TaskBoard />
          <Footer />
        </TasksContext.Provider>
      </ModalState.Provider>
    </>
  );
}

export default App;
