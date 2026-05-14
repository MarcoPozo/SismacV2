import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import EXPLORER_REGISTRY from "../../config/explorerRegistry";
import useWindowStore from "../../store/windowStore";
import PdfViewer from "../../ui/PdfViewer/PdfViewer";
import "./Explorer.css";

const VideoPlayer = ({ item, onClose }) => (
  <div className="explorer__media-view">
    <div className="explorer__media-toolbar">
      <button className="explorer__media-back" onClick={onClose}>
        <IoArrowBackOutline />
        <span>Volver</span>
      </button>
      <span className="explorer__media-title">{item.label}</span>
    </div>
    <div className="explorer__media-body">
      {item.src ? (
        <iframe
          src={item.src}
          title={item.label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="explorer__video-iframe"
        />
      ) : (
        <div className="explorer__media-empty">Video no disponible aún</div>
      )}
    </div>
  </div>
);

const Explorer = () => {
  const [activeCategory, setActiveCategory] = useState(EXPLORER_REGISTRY[0].id);
  const [activePdf, setActivePdf] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  const category = EXPLORER_REGISTRY.find((c) => c.id === activeCategory);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setActivePdf(null);
    setActiveVideo(null);
  };

  const handleItemClick = (item) => {
    if (item.type === "app") {
      openWindow(item.appId);
    } else if (item.type === "link") {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else if (item.type === "pdf") {
      setActivePdf(item);
      setActiveVideo(null);
    } else if (item.type === "video") {
      setActiveVideo(item);
      setActivePdf(null);
    }
  };

  const handleCloseViewer = () => {
    setActivePdf(null);
    setActiveVideo(null);
  };

  const showViewer = activePdf || activeVideo;

  return (
    <div className="explorer">
      <aside className="explorer__sidebar">
        {EXPLORER_REGISTRY.map((cat) => (
          <button
            key={cat.id}
            className={`explorer__sidebar-item ${activeCategory === cat.id ? "explorer__sidebar-item--active" : ""}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </aside>

      <main className="explorer__content">
        {activePdf && <PdfViewer item={activePdf} onClose={handleCloseViewer} />}

        {activeVideo && <VideoPlayer item={activeVideo} onClose={handleCloseViewer} />}

        {!showViewer && (
          <>
            {category?.items.length > 0 ? (
              <div className="explorer__grid">
                {category.items.map((item) => {
                  const { Icon, icon } = item;
                  return (
                    <button
                      key={item.id}
                      className="explorer__item"
                      onClick={() => handleItemClick(item)}
                      title={item.label}
                    >
                      <span className="explorer__item-icon">
                        {icon ? (
                          <img src={icon} alt={item.label} draggable={false} />
                        ) : (
                          <Icon />
                        )}
                      </span>
                      <span className="explorer__item-label">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="explorer__empty">
                <span className="explorer__empty-text">Sin contenido por el momento</span>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Explorer;
