import React from "react";
import { Home } from './home.jsx'
import { Contact } from './Contact.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Properties } from './properties.jsx';
import { PropertiesDetails } from './PropertieDetails.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MakeVisit } from "./MakeVisit.jsx";
import { LoginAdministrator } from "./administrator/AdminLogin.jsx";
import { Dashboard } from "./administrator/Dashboard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UsersAdministrator } from "./administrator/Users.jsx";
import { PropertiesAdministrator } from "./administrator/Properties.jsx";
import { VisitAdministrator } from "./administrator/visit.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/properties-details/:id" element={<PropertiesDetails />} />
				<Route path="/visit/:id" element={<MakeVisit />} />


				<Route path="/admin-login" element={<LoginAdministrator />} />

				
				<Route path="/dashboard" element={<AuthProvider > <Dashboard /> </AuthProvider>} />
				<Route path="/dashboard/users" element={<AuthProvider > <UsersAdministrator /> </AuthProvider>} />
				<Route path="/dashboard/properties" element={<AuthProvider > <PropertiesAdministrator /> </AuthProvider>} />
				<Route path="/dashboard/visit" element={<AuthProvider > <VisitAdministrator /> </AuthProvider>} />
				
			</Routes>
		</Router>
	)
}	

export default App
