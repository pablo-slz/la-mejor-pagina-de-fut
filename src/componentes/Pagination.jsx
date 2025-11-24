const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange, 
    totalItems 
}) => {
    
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                <label>
                    MOSTRAR
                    <select 
                        value={itemsPerPage} 
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="items-per-page-select"
                    >
                        <option value={5}>5 por página</option>
                        <option value={10}>10 por página</option>
                        <option value={20}>20 por página</option>
                    </select>
                </label>
                <span className="showing-info">
                    Mostrando {startItem}-{endItem} de {totalItems} registros
                </span>
            </div>
            
            <div className="pagination-controls">
                <button 
                    onClick={() => onPageChange(1)} 
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    ≪
                </button>
                
                <button 
                    onClick={() => onPageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    ‹
                </button>
                
                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                
                <button 
                    onClick={() => onPageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    ›
                </button>
                
                <button 
                    onClick={() => onPageChange(totalPages)} 
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    ≫
                </button>
            </div>
        </div>
    );
};

export default Pagination;