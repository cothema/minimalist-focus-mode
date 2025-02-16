import React from "react";
import {createRoot} from "react-dom/client";

const Settings: React.FC = () => {
  return (
    <>
      <div className="menu">
        <div className="menu-item">
          About the Extension
        </div>
        <a href="mailto:ceo+focusmode@cothema.com" target="_blank" rel="noopener noreferrer">
          <div className="p-2 hover:bg-gray-700 cursor-pointer" id="report">
            Report Issue
          </div>
        </a>
      </div>

      <div className="content">
        <div className="content-text">
          <p>
            Minimalist Focus Mode is a Chrome extension designed to help users stay focused by hiding distracting
            elements.
            This extension allows users to toggle focus mode, which hides specific elements.
          </p>

          <h2>Supported websites</h2>
          <ul>
            <li>LinkedIn</li>
            <li>Facebook</li>
            <li>YouTube</li>
          </ul>
        </div>

        <footer>
          <p>
            The extension is licensed under Apache License Version 2.0.<br/>
            You can find the source code on <a href="https://github.com/cothema/minimalist-focus-mode/"
                                               target="_blank"
                                               rel="noopener noreferrer">GitHub</a>.
          </p>
          <p>
            Created by <a href="https://cothema.com/" target="_blank" rel="noopener noreferrer">Cothema s.r.o.</a>
          </p>
        </footer>
      </div>
    </>
  )
};

const container = document.getElementById("settings-root");
if (container) {
  createRoot(container).render(<Settings />);
}
