import React from "react";
import { Home } from './home.jsx'
import { Contact } from './Contact.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Properties } from './properties.jsx';
import { Productions } from './components/production.jsx';
import { PropertieDetails } from './PropertieDetails.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MakeVisit } from "./MakeVisit.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/propertie-details/:id" element={<PropertieDetails />} />
				<Route path="/visit/:id" element={<MakeVisit />} />
			</Routes>
		</Router>
	)
}	

export default App
