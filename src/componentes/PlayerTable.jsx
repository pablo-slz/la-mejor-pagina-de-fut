import PlayerRow from './PlayerRow';

const PlayerTable = ({ 
    players, 
    onRowClick, 
    onSort, 
    sortConfig, 
    favorites, 
    onToggleFavorite,
    rowColors 
}) => {
    
    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) return '⇅';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    const getRowColorClass = (index) => {
        if (rowColors === 'pares' && index % 2 === 0) return 'row-highlight-even';
        if (rowColors === 'impares' && index % 2 !== 0) return 'row-highlight-odd';
        return '';
    };

    return (
        <div className="table-container">
            <table className="players-table">
                <thead>
                    <tr>
                        <th>FAV</th>
                        <th onClick={() => onSort('name')}>
                            JUGADOR <span className="sort-icon">{getSortIcon('name')}</span>
                        </th>
                        <th onClick={() => onSort('club')}>
                            CLUB <span className="sort-icon">{getSortIcon('club')}</span>
                        </th>
                        <th onClick={() => onSort('position')}>
                            POSICIÓN <span className="sort-icon">{getSortIcon('position')}</span>
                        </th>
                        <th onClick={() => onSort('country')}>
                            PAÍS <span className="sort-icon">{getSortIcon('country')}</span>
                        </th>
                        <th onClick={() => onSort('age')}>
                            EDAD <span className="sort-icon">{getSortIcon('age')}</span>
                        </th>
                        <th onClick={() => onSort('goals')}>
                            GOLES <span className="sort-icon">{getSortIcon('goals')}</span>
                        </th>
                        <th onClick={() => onSort('assists')}>
                            ASISTENCIAS <span className="sort-icon">{getSortIcon('assists')}</span>
                        </th>
                        <th onClick={() => onSort('rating')}>
                            RATING <span className="sort-icon">{getSortIcon('rating')}</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {players.map((player, index) => (
                        <PlayerRow
                            key={player.id}
                            player={player}
                            index={index}
                            onClick={() => onRowClick(player)}
                            isFavorite={favorites.includes(player.id)}
                            onToggleFavorite={onToggleFavorite}
                            colorClass={getRowColorClass(index)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerTable;
