import ReactPaginate from 'react-paginate';
import React from 'react';

// Componente de navegación para la paginación
export function Navigate({ handlePageClick, pageCount }) {
    return (
        <div className="row">
            {/* Componente de paginación proporcionado por la librería `react-paginate` */}
            <ReactPaginate
                // Etiqueta para el botón de salto de página
                breakLabel="..."
                // Etiqueta para el botón de siguiente página
                nextLabel=">"
                // Función a llamar cuando se cambia la página
                onPageChange={handlePageClick}
                // Rango de páginas a mostrar en la paginación
                pageRangeDisplayed={5}
                // Número total de páginas
                pageCount={pageCount}
                // Etiqueta para el botón de página anterior
                previousLabel="<"
                // Comportamiento cuando no hay páginas para mostrar (nulo en este caso)
                renderOnZeroPageCount={null}
                // Clases CSS para el contenedor de paginación
                containerClassName="pagination"
                // Clases CSS para cada elemento de página
                pageClassName="page-item"
                // Clases CSS para el enlace de cada página
                pageLinkClassName="page-link"
                // Clases CSS para el botón de página anterior
                previousClassName="page-item"
                // Clases CSS para el enlace del botón de página anterior
                previousLinkClassName="page-link"
                // Clases CSS para el botón de siguiente página
                nextClassName="page-item"
                // Clases CSS para el enlace del botón de siguiente página
                nextLinkClassName="page-link"
                // Clases CSS para el elemento activo de la página
                activeClassName="active"
            />
        </div>
    )
}
