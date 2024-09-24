import React from "react";
import { Home } from './home.jsx';
import { Contact } from './Contact.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Properties } from './properties.jsx';
import { PropertiesDetails } from './PropertyDetails.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap para estilos
import { MakeVisit } from "./MakeVisit.jsx";
import { LoginAdministrator } from "./administrator/AdminLogin.jsx";
import { Dashboard } from "./administrator/Dashboard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // Contexto de autenticación para proteger rutas de admin
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
				{/* Rutas públicas */}
				<Route path="/" element={<Home />} /> {/* Ruta principal */}
				<Route path="/properties" element={<Properties />} /> {/* Lista de propiedades */}
				<Route path="/contact" element={<Contact />} /> {/* Página de contacto */}
				<Route path="/property-details/:id" element={<PropertiesDetails />} /> {/* Detalles de una propiedad con ID */}
				<Route path="/visit/:id" element={<MakeVisit />} /> {/* Página para agendar visita con ID de propiedad */}

				{/* Rutas para administrador */}
				{/* Login de administrador */}
				<Route path="/admin-login" element={<LoginAdministrator />} />

				{/* Home o panel principal del administrador, protegido con AuthProvider */}
				<Route path="/dashboard" element={<AuthProvider><Dashboard /></AuthProvider>} />

				{/* Rutas para la gestión de usuarios por parte del administrador */}
				<Route path="/dashboard/users" element={<AuthProvider><UsersAdministrator /></AuthProvider>} />
				<Route path="/dashboard/users/modify/:id" element={<AuthProvider><ModifyUsers /></AuthProvider>} /> {/* Modificar usuario por ID */}
				<Route path="/dashboard/users/create" element={<AuthProvider><CreateUsers /></AuthProvider>} /> {/* Crear nuevo usuario */}

				{/* Rutas para la gestión de propiedades por parte del administrador */}
				<Route path="/dashboard/properties" element={<AuthProvider><PropertiesAdministrator /></AuthProvider>} /> 
				<Route path="/dashboard/properties/modify/:id" element={<AuthProvider><ModifyProperties /></AuthProvider>} /> {/* Modificar propiedad por ID */}
				<Route path="/dashboard/properties/create" element={<AuthProvider><CreateProperties /></AuthProvider>} /> {/* Crear nueva propiedad */}

				{/* Rutas para la gestión de visitas por parte del administrador */}
				<Route path="/dashboard/visit" element={<AuthProvider><VisitAdministrator /></AuthProvider>} />
			</Routes>
		</Router>
	)
}

export default App;
