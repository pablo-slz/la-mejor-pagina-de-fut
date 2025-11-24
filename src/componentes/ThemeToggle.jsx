const ThemeToggle = ({ darkMode, onToggle }) => {
    return (
        <button className="theme-toggle" onClick={onToggle}>
            {darkMode ? '☀️ Modo claro' : '🌙 Modo oscuro'}
        </button>
    );
};

export default ThemeToggle;