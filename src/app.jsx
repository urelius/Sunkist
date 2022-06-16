import * as React from 'react';
import ReactDom from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom';

import Main from './modules/Main.js';
import Profiles from './modules/Profiles.js'

const container = document.getElementById('root');
const root = ReactDom.createRoot(container);

// Initial render
root.render(
    <HashRouter>
        <Routes>
            <Route index element={<Main />} />
            <Route path="/profiles" element={<Profiles />} />
        </Routes>
    </HashRouter>
);