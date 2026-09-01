type FilterToggleProps = {
  filter: string;
  setFilter: (value: string) => void;
};
export default function FilterToggle({ filter, setFilter }: FilterToggleProps) {
  return (
    <div className="filter">
      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={filter === "active" ? "active-filter" : ""}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={filter === "done" ? "active-filter" : ""}
        onClick={() => setFilter("done")}
      >
        Done
      </button>
    </div>
  );
}
