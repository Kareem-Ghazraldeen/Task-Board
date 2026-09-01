type Task = {
  id: number;
  title: string;
  done: boolean;
};

type TaskItemProps = {
  task: Task;
  editTextId: number | null;
  editText: string;
  setEditTask: (value: string) => void;
  saveEdit: () => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  startEdit: (task: Task) => void;
};

export default function TaskItem({
  task,
  editTextId,
  editText,
  setEditTask,
  saveEdit,
  deleteTask,
  toggleTask,
  startEdit,
}: TaskItemProps) {
  return (
    <div className="task">
      {editTextId === task.id ? (
        <>
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
          <div className="task-buttons">
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => startEdit(task)}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
}
