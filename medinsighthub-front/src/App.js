import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route
						path='/'
						exact
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route path='/login' exact element={localStorage.getItem('medhub-token') ? <Navigate to='/' /> : <LoginForm />} />
					<Route path='*' element={<NotFoundPage/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
