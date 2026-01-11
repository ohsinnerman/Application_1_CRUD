import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials as setAuthCredentials } from '../features/auth/authSlice';
import { Box, TextField, Button, Typography, Container, Paper, Alert, Stack } from '@mui/material';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(credentials).unwrap();
            dispatch(setAuthCredentials({ user: response.user, token: response.token }));
            navigate('/channels/@me');
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
        }}>
            <Container maxWidth="xs">
                <Paper elevation={8} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Sign in to continue to ChatSpace
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>Invalid email or password</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                required
                                value={credentials.email}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{ py: 1.5, mt: 1 }}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </Stack>
                    </form>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
