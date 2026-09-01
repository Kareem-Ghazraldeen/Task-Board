type ThemeToggleProps = {
  theme: string;
  setTheme: (value: string) => void;
};
export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <button
      className="theme-btn"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️ Light" : " 🌙 Dark"}
    </button>
  );
}
