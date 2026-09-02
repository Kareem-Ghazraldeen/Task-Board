import type { Task } from "../types";
type CounterProps = {
  tasks: Task[];
};
export default function Counter({ tasks }: CounterProps) {
  return (
    <p className="counter">
      {tasks.length} Tasks . {tasks.filter((task) => task.done).length} Done
    </p>
  );
}
