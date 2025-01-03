import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import "./index.css";
import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import { auth } from "./components/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase authentication state listener
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Load todos from localStorage
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const loadedTodos = JSON.parse(todoString);
      setTodos(loadedTodos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    const t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <Router>
      <div>
        {user ? (
          <>
            <Navbar />
            <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-red min-h-[80vh] md:w-1/2">
              <h1 className="font-bold text-center text-xl">Manage Your To-Do's From Here</h1>
              <div className="addTodo my-5 flex flex-col gap-4">
                <h2 className="text-lg font-bold">Add a Todo</h2>
                <input
                  onChange={handleChange}
                  value={todo}
                  type="text"
                  className="w-full rounded-full px-5 py-1 text-black"
                />
                <button
                  onClick={handleAdd}
                  disabled={todo.length <= 3}
                  className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold text-white rounded-md transition ease-in-out duration-300 transform hover:scale-105"
                >
                  Save
                </button>
              </div>
              <input
                className="my-4"
                onChange={toggleFinished}
                type="checkbox"
                checked={showFinished}
              />
              <span> Show Finished</span>
              <h2 className="text-lg font-bold">Your Todos</h2>
              <div className="todos">
                {todos.length === 0 && <div className="m-5">No Todos to display</div>}
                {todos.map((item) => (
                  (showFinished || !item.isCompleted) && (
                    <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between bg-dark-500 rounded-lg p-3">
                      <div className="flex gap-5">
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          checked={item.isCompleted}
                        />
                        <div className={item.isCompleted ? "line-through text-gray-400" : "text-white"}>
                          {item.todo}
                        </div>
                      </div>
                      <div className="buttons flex h-full gap-2">
                        <button
                          onClick={(e) => handleEdit(e, item.id)}
                          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md transition ease-in-out duration-300 transform hover:scale-105"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md transition ease-in-out duration-300 transform hover:scale-105"
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
