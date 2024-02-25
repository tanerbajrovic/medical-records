import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	const [role, setRole] = useState(null);

	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<HomePage role={role} />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/login'
						element={localStorage.getItem('medhub-token') ? <Navigate to='/' /> : <LoginForm setRole={setRole} />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
