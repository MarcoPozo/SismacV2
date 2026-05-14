import { useState } from "react";
import { IoArrowBackOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = ({ item, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState(false);

  const handleLoadSuccess = ({ numPages: total }) => {
    setNumPages(total);
    setPageNumber(1);
    setLoadError(false);
  };

  const handlePrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const handleNext = () => setPageNumber((p) => Math.min(numPages ?? 1, p + 1));

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer__toolbar">
        <button className="pdf-viewer__back" onClick={onClose}>
          <IoArrowBackOutline />
          <span>Volver</span>
        </button>

        <span className="pdf-viewer__title">{item.label}</span>

        <div className="pdf-viewer__pagination">
          <button
            className="pdf-viewer__page-btn"
            onClick={handlePrev}
            disabled={pageNumber <= 1}
            title="Página anterior"
          >
            <IoChevronBackOutline />
          </button>
          <span className="pdf-viewer__page-info">
            {pageNumber} / {numPages ?? "—"}
          </span>
          <button
            className="pdf-viewer__page-btn"
            onClick={handleNext}
            disabled={!numPages || pageNumber >= numPages}
            title="Página siguiente"
          >
            <IoChevronForwardOutline />
          </button>
        </div>
      </div>

      <div className="pdf-viewer__body">
        {loadError ? (
          <div className="pdf-viewer__error">
            <span>No se pudo cargar el documento.</span>
            <span className="pdf-viewer__error-hint">
              Verifica que el archivo exista en <code>/public/documents/</code>
            </span>
          </div>
        ) : (
          <Document
            file={item.src}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={() => setLoadError(true)}
            loading={<div className="pdf-viewer__loading">Cargando documento…</div>}
          >
            <Page pageNumber={pageNumber} renderTextLayer renderAnnotationLayer />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
