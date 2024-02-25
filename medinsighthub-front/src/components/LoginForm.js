import { login } from '../services/userService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Alert, TextField, Button, Container, Box, Typography, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      MedInsightHub
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
    </Typography>
  )
}


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
    <Container component={'main'} maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlined/>
        </Avatar>
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
          label='Email Address'
          name='email'
          id='email'
          placeholder='Enter your email...'
          onChange={e => setEmail(e.target.value)}
          autoComplete='email'
          fullWidth
          required
        />
        <TextField
          margin='normal'
          label='Password'
          name='password'
          id='password'
          placeholder='Enter your password...'
          onChange={e => setPassword(e.target.value)}
          autoComplete='current-password'
          fullWidth
          required
        />
        <Button 
          type='submit' 
          fullWidth
          disabled={!email || !password} 
          variant='contained' 
          onClick={handleSubmit}>
          Login
        </Button>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default LoginForm;
