const StatsPanel = ({ stats }) => {
    return (
        <div className="stats-panel">
            <div className="stat-card">
                <h3>JUGADORES EN TABLA</h3>
                <p className="stat-number">{stats.total}</p>
                <span className="stat-badge">Favoritos: {stats.favorites}</span>
            </div>
            
            <div className="stat-card">
                <h3>PROMEDIO DE GOLES</h3>
                <p className="stat-number">{stats.avgGoals}</p>
                <span className="stat-subtitle">Total goles: {stats.totalGoals}</span>
            </div>
            
            <div className="stat-card">
                <h3>PROMEDIO DE EDAD</h3>
                <p className="stat-number">{stats.avgAge} años</p>
                <span className="stat-subtitle">Total asistencias: {stats.totalAssists}</span>
            </div>
            
            <div className="stat-card stat-card-dark">
                <h3>MÁXIMO GOLEADOR</h3>
                <p className="stat-player">{stats.topScorer}</p>
            </div>
        </div>
    );
};

export default StatsPanel;