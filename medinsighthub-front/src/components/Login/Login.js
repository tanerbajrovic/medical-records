import { Alert, TextField, Button, Container, Box, Typography } from '@mui/material';
import { login } from '../../services/userService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();

		const request = { email, password };
		console.log(request);
		login(request)
			.then(res => {
				localStorage.setItem('medhub-token', res.data.token);
				navigate('/');
			})
			.catch(err => {
				if (err.response.data.errors) setErrorMessage(err.response.data.errors[0]);
			});
	};

	return (
		<Container component={'main'}>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				{errorMessage?.length > 0 ? (
					<Alert style={{ width: '80%' }} severity='error' variant='filled'>
						{errorMessage}
					</Alert>
				) : null}
				<TextField
					margin='normal'
					name='email'
					id='email'
					placeholder='Enter your email...'
					onChange={e => setEmail(e.target.value)}
				/>
				<TextField
					margin='normal'
					name='password'
					id='password'
					placeholder='Enter your password...'
					onChange={e => setPassword(e.target.value)}
				/>
				<Button disabled={!email || !password} variant='contained' onClick={handleSubmit}>
					Login
				</Button>
			</Box>
		</Container>
	);
};

export default LoginForm;
