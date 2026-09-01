type Task = {
  id: number;
  title: string;
  done: boolean;
};
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
