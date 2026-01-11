import React, { useState } from 'react';
import { useRegisterMutation } from '../features/auth/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Paper, Alert, Stack } from '@mui/material';

const RegisterPage = () => {
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
    const [register, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(credentials).unwrap();
            navigate('/login');
        } catch (err) {
            console.error('Registration failed', err);
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
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Join ChatSpace today
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>Registration failed</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                required
                                value={credentials.username}
                                onChange={handleChange}
                            />
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
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </Button>
                        </Stack>
                    </form>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterPage;
