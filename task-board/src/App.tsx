import { useState, useEffect } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  done: boolean;
};
export default function App() {
  {
    /* Display Tasks */
  }
  const [tasks, setTask] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved : "dark";
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
    setTask([...tasks, { id: Date.now(), title: newTask, done: false }]);
    setNewTask("");
  };
  const deleteTask = (idToDelete: number) => {
    setTask(tasks.filter((task) => task.id !== idToDelete));
  };
  const toggleTask = (idToToggle: number) => {
    setTask(
      tasks.map((task) =>
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
    setTask(
      tasks.map((task) =>
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
  return (
    <div className="app">
      {/* Display Tasks */}
      <button
        className="theme-btn"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "☀️ Light" : " 🌙 Dark"}
      </button>
      <h1>My Tasks</h1>
      <p className="counter">
        {tasks.length} Tasks . {tasks.filter((task) => task.done).length} Done
      </p>
      {tasks.length === 0 ? (
        <p className="empty"> No Tasks yet ⚡</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task">
            {editTextId === task.id ? (
              <>
                {/* Save Task */}
                <input
                  value={editText}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTask(task.id)}
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                {/* Delete A Task */}
                <div className="task-buttons">
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  <button onClick={() => startEdit(task)}>Edit</button>
                </div>
              </>
            )}
          </div>
        ))
      )}

      <div className="add-task">
        {/* Controlled Inputs  */}
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        {/* Adding New Task */}
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>
    </div>
  );
}
