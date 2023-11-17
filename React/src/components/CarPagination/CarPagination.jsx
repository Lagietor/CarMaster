function CarPagination(props) {
    function changeCurrentPageHandler(e, currentPage) {
        e.preventDefault();
        props.changeCurrentPage(currentPage);
    }

    return (
        <div className="mt-4">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${(props.currentPage == 0) ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={(e) => changeCurrentPageHandler(e, 1)} href="#" tabIndex="-1">&laquo;</a>
                    </li>
                    {Array.from({ length: props.totalPages }).map((_, index) => (
                        <li key={index} className="page-item">
                            <a className={`page-link ${(index == props.currentPage) ? 'active' : ''}`} onClick={(e) => changeCurrentPageHandler(e, index + 1)} href="#">
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className={`page-item ${(props.currentPage == props.totalPages - 1) ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={(e) => changeCurrentPageHandler(e, props.totalPages)} href="#">&raquo;</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default CarPagination;