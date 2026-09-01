type AddTaskProps = {
  newTask: string;
  setNewTask: (value: string) => void;
  addTask: () => void;
};
export default function AddTask({
  newTask,
  setNewTask,
  addTask,
}: AddTaskProps) {
  return (
    <div className="add-task">
      {/* Controlled Inputs  */}
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      {/* Adding New Task */}
      <button className="add-btn" onClick={addTask}>
        Add
      </button>
    </div>
  );
}
