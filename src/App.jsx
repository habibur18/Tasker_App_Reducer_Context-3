import { useEffect, useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [search, setSearch] = useState(state);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (searchText) {
      setSearch(state.filter((task) => task.title.toLowerCase().includes(searchText.toLowerCase())));
    } else {
      setSearch(state);
    }
    console.log(searchText);
  }, [searchText, state]);
  return (
    <>
      <ModalState.Provider value={{ modalState, setModalState }}>
        <TasksContext.Provider value={{ state, dispatch, updatedTask, setUpdatedTask, search, setSearch, searchText, setSearchText }}>
          {modalState && <TaskModal needUpdate={updatedTask} />}
          <Navbar />
          <HeroSection />
          <TaskBoard />
          <Footer />
          <ToastContainer />
        </TasksContext.Provider>
      </ModalState.Provider>
    </>
  );
}

export default App;
