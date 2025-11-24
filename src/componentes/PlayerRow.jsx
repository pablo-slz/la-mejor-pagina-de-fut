const PlayerRow = ({ player, index, onClick, isFavorite, onToggleFavorite, colorClass }) => {
    return (
        <tr className={`player-row ${colorClass}`} onClick={onClick}>
            <td>
                <button
                    className={`fav-button ${isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(player.id);
                    }}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </td>
            <td>{player.name}</td>
            <td>{player.club}</td>
            <td>{player.position}</td>
            <td>{player.country}</td>
            <td>{player.age}</td>
            <td>{player.goals}</td>
            <td>{player.assists}</td>
            <td>{player.rating}</td>
        </tr>
    );
};

export default PlayerRow;