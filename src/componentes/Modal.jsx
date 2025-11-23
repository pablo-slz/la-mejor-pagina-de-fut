const Modal = ({ isOpen, onClose, player, onToggleFavorite, isFavorite }) => {
    if (!isOpen || !player) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                
                <div className="modal-header">
                    <h2>{player.name}</h2>
                    <span className="modal-position">{player.position}</span>
                </div>
                
                <div className="modal-body">
                    <div className="modal-info-grid">
                        <div className="modal-info-item">
                            <span className="modal-label">Club</span>
                            <span className="modal-value">{player.club}</span>
                        </div>
                        
                        <div className="modal-info-item">
                            <span className="modal-label">País</span>
                            <span className="modal-value">{player.country}</span>
                        </div>
                        
                        <div className="modal-info-item">
                            <span className="modal-label">Edad</span>
                            <span className="modal-value">{player.age} años</span>
                        </div>
                        
                        <div className="modal-info-item">
                            <span className="modal-label">Goles</span>
                            <span className="modal-value">{player.goals}</span>
                        </div>
                        
                        <div className="modal-info-item">
                            <span className="modal-label">Asistencias</span>
                            <span className="modal-value">{player.assists}</span>
                        </div>
                        
                        <div className="modal-info-item">
                            <span className="modal-label">Rating</span>
                            <span className="modal-value modal-rating">{player.rating}</span>
                        </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button 
                        className={`modal-fav-button ${isFavorite ? 'active' : ''}`}
                        onClick={() => onToggleFavorite(player.id)}
                    >
                        {isFavorite ? '★' : '☆'} {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    </button>
                    
                    <button className="modal-close-button" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;