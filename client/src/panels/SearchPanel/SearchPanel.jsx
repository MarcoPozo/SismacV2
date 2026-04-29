import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./SearchPanel.css";
import usePanelStore from "../../store/panelStore";
import usePanelClose from "../../hooks/usePanelClose";

const TABS = ["All", "Apps", "Documents", "Web", "More"];

const SearchPanel = () => {
  const closePanel = usePanelStore((s) => s.closePanel);
  const panelRef = usePanelClose(closePanel);
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="search-panel" ref={panelRef}>
      <div className="search-panel__bar">
        <IoSearchOutline className="search-panel__bar-icon" />
        <input
          className="search-panel__input"
          type="text"
          placeholder="Type here to search"
          autoFocus
        />
      </div>

      <div className="search-panel__tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`search-panel__tab${activeTab === tab ? " search-panel__tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="search-panel__section">
        <span className="search-panel__section-title">Top apps</span>
        <div className="search-panel__apps" />
      </div>

      <div className="search-panel__section">
        <span className="search-panel__section-title">Quick Searches</span>
        <div className="search-panel__quick" />
      </div>
    </div>
  );
};

export default SearchPanel;
