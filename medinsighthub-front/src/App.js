import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' exact element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
							}
					/>
					{/* CHANGE THIS TO REDIRECT IF TOKEN IS EXPIRED OR USER IS NOT LOGGED IN */}
					<Route 
						path='/login' 
						exact 
						element={localStorage.getItem('medhub-token') ? <Navigate to='/' /> : <LoginPage />} 
					/>
					<Route path='*' element={<NotFoundPage/>}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
