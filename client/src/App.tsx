import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequireAuth from './components/RequireAuth';
import ChatDashboard from './pages/ChatDashboard';
import LandingPage from './pages/LandingPage';

import { aestheticTheme } from './theme';

function App() {
    return (
        <ThemeProvider theme={aestheticTheme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/channels/@me" element={<ChatDashboard />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
