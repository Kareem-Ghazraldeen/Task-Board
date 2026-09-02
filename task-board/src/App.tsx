import { useState, useEffect } from "react";
import ThemeToggle from "./Component/ThemeToggle";
import FilterToggle from "./Component/FilterToggle";
import Counter from "./Component/Counter";
import AddTask from "./Component/AddTask";
import TaskItem from "./Component/TaskItem";
import type { Task } from "./types";

import "./App.css";

export default function App() {
  {
    /* Display Tasks */
  }
  const [tasks, setTask] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  // (Dark/Light Mode)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved : "dark";
  });
  // Adding the filter to the local storage:

  const [filter, setFilter] = useState(() => {
    const saved = localStorage.getItem("filter");
    return saved ? saved : "all";
  });
  {
    /* Controlled Inputs  */
  }
  const [newTask, setNewTask] = useState("");

  {
    /* Adding New Task  */
  }
  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    }
    setTask((prevTask) => [
      ...prevTask,
      { id: Date.now(), title: newTask, done: false },
    ]);
    setNewTask("");
  };
  const deleteTask = (idToDelete: number) => {
    setTask((prevTask) => prevTask.filter((task) => task.id !== idToDelete));
  };
  const toggleTask = (idToToggle: number) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === idToToggle ? { ...task, done: !task.done } : task,
      ),
    );
  };
  // Editing a Task
  const [editText, setEditTask] = useState("");
  const [editTextId, setEditTaskId] = useState<number | null>(null);
  const startEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditTask(task.title);
  };
  // Save a Task
  const saveEdit = () => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === editTextId ? { ...task, title: editText } : task,
      ),
    );
    setEditTaskId(null);
  };
  //  Saving to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //  Saving to localStorage (Dark/Light Mode)
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  // Dark/Light Mode
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });
  return (
    <div className="app">
      {/* Display Tasks */}
      <div className="left-panel">
        <h1>My Tasks</h1>
        <Counter tasks={tasks}></Counter>
        <FilterToggle filter={filter} setFilter={setFilter}></FilterToggle>
        <ThemeToggle theme={theme} setTheme={setTheme}></ThemeToggle>
        <AddTask
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        ></AddTask>
      </div>
      <div className="right-panel">
        {filteredTasks.length === 0 ? (
          <p className="empty"> No Tasks yet ⚡</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              editTextId={editTextId}
              editText={editText}
              setEditTask={setEditTask}
              saveEdit={saveEdit}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              startEdit={startEdit}
            ></TaskItem>
          ))
        )}
      </div>
    </div>
  );
}
