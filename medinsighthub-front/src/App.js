import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					{/* CHANGE THIS TO REDIRECT IF TOKEN IS EXPIRED OR USER IS NOT LOGGED IN */}
					<Route path='/login' element={localStorage.getItem('medhub-token') ? <Navigate to='/' /> : <LoginForm />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
