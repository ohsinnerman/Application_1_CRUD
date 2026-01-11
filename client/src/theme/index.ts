import { createTheme } from '@mui/material/styles';

export const aestheticTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6366f1', // Indigo 500
            light: '#818cf8',
            dark: '#4f46e5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ec4899', // Pink 500
            light: '#f472b6',
            dark: '#db2777',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc', // Slate 50
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b', // Slate 800
            secondary: '#64748b', // Slate 500
        },
        error: {
            main: '#ef4444',
        },
        success: {
            main: '#10b981',
        },
        divider: '#e2e8f0',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '12px',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)', // Soft colored shadow on hover
                        transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                },
                contained: {
                    // Keep flat initially
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Very soft diffuse shadow
                },
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)',
                },
                elevation8: {
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)', // Soft large shadow
                }
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        backgroundColor: '#f8fafc',
                        '& fieldset': {
                            borderColor: '#e2e8f0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#cbd5e1',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6366f1',
                            borderWidth: 2,
                        },
                        '&.Mui-focused': {
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        }
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#f8fafc',
                }
            }
        }
    },
});
