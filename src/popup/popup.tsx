import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

declare const chrome: any;

type Mode = "create" | "networking" | "analytics" | "inspiration" | "play" | "disabled";

const MODES: { mode: Mode; emoji?: string; label: string }[] = [
  { mode: "create", emoji: "🎨", label: "Creating & Deep Work" },
  { mode: "networking", emoji: "🤝", label: "Networking & Friends" },
  { mode: "analytics", emoji: "📊", label: "Analytics" },
  { mode: "inspiration", emoji: "💡", label: "Inspiration & News" },
  { mode: "play", emoji: "🎮", label: "Fun & Games" },
  { mode: "disabled", label: "Disable" },
];

const DOPAMIN_INDEX: Record<Mode, number> = {
  create: 100,
  networking: 30,
  analytics: 20,
  inspiration: 10,
  play: 0,
  disabled: 0,
};

const Popup: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<Mode>("disabled");

  useEffect(() => {
    chrome.storage.sync.get(["selectedMode"], (data: { selectedMode?: Mode }) => {
      const mode = data.selectedMode || "disabled";
      setSelectedMode(mode);
      updateDopaminIndex(mode);
      highlightSelectedMode(mode);
      updateExtensionIcon(mode);
    });
  }, []);

  const handleModeChange = (mode: Mode) => {
    if (mode === selectedMode) return;
    chrome.storage.sync.set({ selectedMode: mode }, () => {
      setSelectedMode(mode);
      updateDopaminIndex(mode);
      highlightSelectedMode(mode);
      updateExtensionIcon(mode);
      chrome.runtime.sendMessage({ action: "reloadPage" });
      window.close();
    });
  };

  const updateDopaminIndex = (mode: Mode) => {
    const index = DOPAMIN_INDEX[mode];
    const dopaminIndexElement = document.getElementById("dopaminIndexValue");
    if (dopaminIndexElement) {
      dopaminIndexElement.textContent = `${index}%`;
      dopaminIndexElement.style.color = `rgb(${255 - index * 2.55}, ${index * 2.55}, 0)`;
    }
  };

  const highlightSelectedMode = (mode: Mode) => {
    document.querySelectorAll("button[data-mode]").forEach((button) => {
      button.classList.toggle("enabled", button.getAttribute("data-mode") === mode);
    });
  };

  const updateExtensionIcon = (mode: Mode) => {
    chrome.action.setIcon({ path: `../assets/icons/mode/${mode}.png` });
  };

  return (
    <div>
      <h2>Focus on:</h2>
      <a href="/settings/settings.html" target="_blank">
        <FontAwesomeIcon icon={faCog} className="settings-icon pointer" title="Settings" />
      </a>
      <div id="modeButtons">
        {MODES.map(({ mode, emoji, label }) => (
          <button
            key={mode}
            data-mode={mode}
            className={`mode-button ${selectedMode === mode ? "enabled" : ""}`}
            onClick={() => handleModeChange(mode)}
            disabled={selectedMode === mode}
          >
            {emoji} {label}
          </button>
        ))}
      </div>
      <div id="dopaminIndex" className="dopamin-index">
        <div id="dopaminIndexTitle">
          Dopamin Index
          <a href="/settings/settings.html" target="_blank">
            <FontAwesomeIcon icon={faQuestionCircle} className="pointer" title="Dopamin Index Explanation" />
          </a>
        </div>
        <div id="dopaminIndexValue">?</div>
      </div>
      <div className="report-issue">
        <a href="mailto:ceo+focusmode@cothema.com" target="_blank">Report issue</a>
      </div>
    </div>
  )
};

const container = document.getElementById("popup-root");
if (container) {
  createRoot(container).render(<Popup />);
}
