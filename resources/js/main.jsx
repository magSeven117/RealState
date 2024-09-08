import App from './MainApp'
import React from 'react';
import ReactDOM from 'react-dom/client';

import { HouseProvider } from './context/houseContext.jsx';

const Index = ReactDOM.createRoot(document.getElementById("root"));

Index.render(
    <HouseProvider>
        <App />
    </HouseProvider>
)
