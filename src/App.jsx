import { useState, useEffect, useMemo } from 'react';
import {playersData} from './data/playersData';
import SearchBar from './componentes/SearchBar';
import ThemeToggle from './componentes/ThemeToggle';
import StatsPanel from './componentes/StatsPanel';
import PlayerTable from './componentes/PlayerTable';
import Modal from './componentes/Modal';
import Pagination from './componentes/Pagination';
import './App.css';

function App() {
    // Estados principales
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowColors, setRowColors] = useState('none');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'none'
    });

    // useEffect para debounce de búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // useEffect para cargar datos de localStorage al iniciar
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        const savedFavorites = localStorage.getItem('favorites');
        const savedHistory = localStorage.getItem('searchHistory');
        
        if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    }, []);

    // useEffect para guardar darkMode en localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.className = darkMode ? 'dark-mode' : '';
    }, [darkMode]);

    // useEffect para guardar favoritos en localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // useEffect para actualizar historial de búsqueda
    useEffect(() => {
        if (debouncedSearch && debouncedSearch.length > 1) {
            setSearchHistory(prev => {
                const updated = [debouncedSearch, ...prev.filter(s => s !== debouncedSearch)];
                const limited = updated.slice(0, 5);
                localStorage.setItem('searchHistory', JSON.stringify(limited));
                return limited;
            });
        }
    }, [debouncedSearch]);

    // useEffect para resetear página cuando cambia la búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, showOnlyFavorites]);

    // Función para ordenar
    const handleSort = (key) => {
        let direction = 'asc';
        
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else if (sortConfig.direction === 'desc') {
                direction = 'none';
            }
        }
        
        setSortConfig({ key, direction });
    };

    // Filtrado y ordenamiento con useMemo
    const filteredAndSortedPlayers = useMemo(() => {
        let filtered = [...playersData];

        if (debouncedSearch) {
            filtered = filtered.filter(player =>
                player.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        if (showOnlyFavorites) {
            filtered = filtered.filter(player => favorites.includes(player.id));
        }

        if (sortConfig.direction !== 'none' && sortConfig.key) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                
                if (typeof aValue === 'string') {
                    return sortConfig.direction === 'asc' 
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
                
                return sortConfig.direction === 'asc' 
                    ? aValue - bValue 
                    : bValue - aValue;
            });
        }

        return filtered;
    }, [debouncedSearch, showOnlyFavorites, favorites, sortConfig]);

    // Estadísticas calculadas con useMemo
    const stats = useMemo(() => {
        const players = filteredAndSortedPlayers;
        
        const avgGoals = players.length > 0
            ? (players.reduce((sum, p) => sum + p.goals, 0) / players.length).toFixed(1)
            : '0.0';
        
        const avgAge = players.length > 0
            ? Math.round(players.reduce((sum, p) => sum + p.age, 0) / players.length)
            : 0;
        
        const topScorer = players.length > 0
            ? players.reduce((max, p) => p.goals > max.goals ? p : max).name
            : 'N/A';
        
        const totalGoals = players.reduce((sum, p) => sum + p.goals, 0);
        const totalAssists = players.reduce((sum, p) => sum + p.assists, 0);

        return {
            total: players.length,
            favorites: favorites.length,
            avgGoals,
            avgAge,
            topScorer,
            totalGoals,
            totalAssists
        };
    }, [filteredAndSortedPlayers, favorites]);

    // Paginación
    const totalPages = Math.ceil(filteredAndSortedPlayers.length / itemsPerPage);
    const paginatedPlayers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedPlayers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSortedPlayers, currentPage, itemsPerPage]);

    // Funciones de manejo
    const handleToggleFavorite = (playerId) => {
        setFavorites(prev =>
            prev.includes(playerId)
                ? prev.filter(id => id !== playerId)
                : [...prev, playerId]
        );
    };

    const handleOpenModal = (player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setDebouncedSearch('');
    };

    const handleSelectHistory = (term) => {
        setSearchTerm(term);
    };

    const handleClearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    return (
        <div className={`app ${darkMode ? 'dark' : ''}`}>
            <header className="header">
                <div className="header-content">
                    <div>
                        <p className="header-subtitle">TOP CLUB SOCCER</p>
                        <h1 className="header-title">Dashboard de Jugadores</h1>
                        <p className="header-description">
                            Gestiona tus estrellas favoritas, analiza estadísticas y descubre talentos.
                        </p>
                    </div>
                    <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
                </div>
            </header>

            <main className="main-content">
                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    onClear={handleClearSearch}
                    resultsCount={filteredAndSortedPlayers.length}
                    searchHistory={searchHistory}
                    onSelectHistory={handleSelectHistory}
                    onClearHistory={handleClearHistory}
                />

                <StatsPanel stats={stats} />

                <div className="controls-section">
                    <div className="color-controls">
                        <button 
                            className="control-button"
                            onClick={() => setRowColors('pares')}
                        >
                            Pintar filas pares
                        </button>
                        <button 
                            className="control-button"
                            onClick={() => setRowColors('impares')}
                        >
                            Pintar filas impares
                        </button>
                        <button 
                            className="control-button"
                            onClick={() => setRowColors('none')}
                        >
                            Limpiar color
                        </button>
                    </div>
                </div>

                <PlayerTable
                    players={paginatedPlayers}
                    onRowClick={handleOpenModal}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    rowColors={rowColors}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    totalItems={filteredAndSortedPlayers.length}
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    player={selectedPlayer}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={selectedPlayer ? favorites.includes(selectedPlayer.id) : false}
                />
            </main>
        </div>
    );
}

export default App;