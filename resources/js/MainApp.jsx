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
import { ModifyUsers } from "./administrator/ModifyUsers.jsx";
import { CreateUsers } from "./administrator/CreateUsers.jsx";
import { CreateProperties } from "./administrator/CreateProperties.jsx";
import { ModifyProperties } from "./administrator/ModifyProperties.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/properties-details/:id" element={<PropertiesDetails />} />
				<Route path="/visit/:id" element={<MakeVisit />} />


				{/* Login Admin */}
				<Route path="/admin-login" element={<LoginAdministrator />} />

				{/* Home Admin */}
				<Route path="/dashboard" element={<AuthProvider > <Dashboard /> </AuthProvider>} />

				{/* Control Users Admin */}
				<Route path="/dashboard/users" element={<AuthProvider > <UsersAdministrator /> </AuthProvider>} />
				<Route path="/dashboard/users/modify/:id" element={<AuthProvider > <ModifyUsers /> </AuthProvider>} />
				<Route path="/dashboard/users/create" element={<AuthProvider > <CreateUsers /> </AuthProvider>} />


				{/* Control Properties Admin */}
				<Route path="/dashboard/properties" element={<AuthProvider > <PropertiesAdministrator /> </AuthProvider>} />
				<Route path="/dashboard/properties/modify/:id" element={<AuthProvider > <ModifyProperties /> </AuthProvider>} />
				<Route path="/dashboard/properties/create" element={<AuthProvider > <CreateProperties /> </AuthProvider>} />

				{/* Control Visit Admin */}
				<Route path="/dashboard/visit" element={<AuthProvider > <VisitAdministrator /> </AuthProvider>} />
				
			</Routes>
		</Router>
	)
}	

export default App
