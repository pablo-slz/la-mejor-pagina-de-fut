import { useState } from 'react';

const SearchBar = ({ value, onChange, onClear, resultsCount, searchHistory, onSelectHistory, onClearHistory }) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <div className="search-input-group">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Escribe un nombre o club..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setShowHistory(true)}
                        onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                    />
                    {value && (
                        <button className="clear-button" onClick={onClear}>
                            ✕
                        </button>
                    )}
                </div>

                {showHistory && searchHistory.length > 0 && (
                    <div className="search-history">
                        <div className="search-history-header">
                            <span>Historial de búsqueda</span>
                            <button onClick={onClearHistory} className="clear-history-btn">
                                Limpiar
                            </button>
                        </div>

                        {searchHistory.map((term, index) => (
                            <div
                                key={index}
                                className="search-history-item"
                                onClick={() => onSelectHistory(term)}
                            >
                                {term}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {value && (
                <p className="results-count">
                    Mostrando {resultsCount} resultado{resultsCount !== 1 ? 's' : ''}
                </p>
            )}
        </div>
    );
};

export default SearchBar;