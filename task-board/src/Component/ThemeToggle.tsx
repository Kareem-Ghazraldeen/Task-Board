type ThemeToggleProps = {
  theme: string;
  setTheme: (value: string | ((prev: string) => string)) => void;
};
export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <button
      className="theme-btn"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? "☀️ Light" : " 🌙 Dark"}
    </button>
  );
}
