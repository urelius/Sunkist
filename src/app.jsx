import * as React from "react";
import ReactDom from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import './index.css'

import Main from "./modules/Main";
import Settings from "./modules/Settings";

const container = document.getElementById("root");
const root = ReactDom.createRoot(container);

// Initial render
root.render(
  <HashRouter>
    <Routes>
      <Route index element={<Main />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </HashRouter>
);
