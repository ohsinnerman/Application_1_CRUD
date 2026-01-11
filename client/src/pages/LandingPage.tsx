import React from 'react';
import { Box, Typography, Button, Container, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import ForumIcon from '@mui/icons-material/Forum';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Navbar */}
            <Box sx={{ py: 2, bgcolor: 'transparent' }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        ChatSpace
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => navigate('/login')} color="inherit" sx={{ fontWeight: 600 }}>Login</Button>
                        <Button onClick={() => navigate('/register')} variant="contained" sx={{ borderRadius: 50, px: 3 }}>
                            Get Started
                        </Button>
                    </Stack>
                </Container>
            </Box>

            {/* Hero Section */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
                        <Box sx={{ flex: 1 }}>
                            <Box>
                                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, lineHeight: 1.1, mb: 3, letterSpacing: '-0.02em', color: '#1e293b' }}>
                                    Connect with <br />
                                    <Box component="span" sx={{ color: 'primary.main' }}>Effortless Style.</Box>
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mb: 4, maxWidth: 450, lineHeight: 1.6 }}>
                                    A beautiful, private, and powerful way to chat with your friends and communities.
                                    Experience messaging reimagined for aesthetics and speed.
                                </Typography>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <Button onClick={() => navigate('/register')} variant="contained" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 50 }}>
                                        Start Chatting
                                    </Button>
                                    <Button onClick={() => navigate('/login')} variant="outlined" size="large" sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 50, borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
                                        Sign In
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            {/* Abstract UI Mockup */}
                            <Box sx={{
                                position: 'relative',
                                height: 500,
                                width: '100%',
                                borderRadius: 4,
                                bgcolor: 'background.default',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    width: '120%',
                                    height: '120%',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.1) 50%, rgba(255,255,255,0) 70%)',
                                    zIndex: -1,
                                }} />
                                <Paper elevation={8} sx={{ width: 320, p: 3, borderRadius: 3, transform: 'rotate(-3deg)' }}>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'secondary.light' }} />
                                        <Box>
                                            <Box sx={{ width: 100, height: 10, bgcolor: 'grey.200', borderRadius: 1, mb: 1 }} />
                                            <Box sx={{ width: 60, height: 10, bgcolor: 'grey.100', borderRadius: 1 }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">Hey! Did you check out the new design? It looks incredible! ✨</Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 2, color: 'white', alignSelf: 'flex-end', ml: 4 }}>
                                        <Typography variant="body2">Absolutely! The colors are so soothing. 💜</Typography>
                                    </Box>
                                </Paper>

                                <Paper elevation={12} sx={{ width: 200, p: 2, borderRadius: 3, position: 'absolute', bottom: 40, right: 0, transform: 'rotate(5deg)' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main' }} />
                                        <Typography variant="caption" fontWeight="bold">Online & Fast</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 10, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                        <Box sx={{ flex: 1 }}>
                            <Paper sx={{ p: 4, height: '100%', borderRadius: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }} elevation={1}>
                                <Box sx={{ width: 60, height: 60, borderRadius: 3, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', mb: 3 }}>
                                    <SpeedIcon fontSize="large" />
                                </Box>
                                <Typography variant="h5" gutterBottom>Lightning Fast</Typography>
                                <Typography color="text.secondary">
                                    Real-time message delivery powered by optimized WebSockets. No waiting, just chatting.
                                </Typography>
                            </Paper>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Paper sx={{ p: 4, height: '100%', borderRadius: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }} elevation={1}>
                                <Box sx={{ width: 60, height: 60, borderRadius: 3, bgcolor: 'secondary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', mb: 3 }}>
                                    <SecurityIcon fontSize="large" />
                                </Box>
                                <Typography variant="h5" gutterBottom>End-to-End Secure</Typography>
                                <Typography color="text.secondary">
                                    Your conversations are your business. We use industry-standard encryption to keep them safe.
                                </Typography>
                            </Paper>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Paper sx={{ p: 4, height: '100%', borderRadius: 4, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }} elevation={1}>
                                <Box sx={{ width: 60, height: 60, borderRadius: 3, bgcolor: 'success.light', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', mb: 3 }}>
                                    <ForumIcon fontSize="large" />
                                </Box>
                                <Typography variant="h5" gutterBottom>Community Ready</Typography>
                                <Typography color="text.secondary">
                                    Whether it's 2 people or 2,000. Create groups, manage roles, and build your space.
                                </Typography>
                            </Paper>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
