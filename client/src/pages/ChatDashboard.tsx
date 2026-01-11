import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Typography, Avatar, IconButton, InputBase, Paper, Divider, Stack, Badge } from '@mui/material';
import { useGetChatsQuery } from '../features/chat/chatApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import ChatWindow from '../components/ChatWindow';
import CreateChatDialog from '../components/CreateChatDialog';
import { RootState } from '../app/store';

const ChatDashboard = () => {
    const { data: chats, isLoading } = useGetChatsQuery();
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [openNewChat, setOpenNewChat] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>

            {/* Sidebar */}
            <Paper elevation={0} sx={{
                width: 320,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white',
                zIndex: 10
            }}>
                {/* Sidebar Header */}
                <Box sx={{ p: 3, pb: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h5" fontWeight="800" sx={{ color: 'text.primary' }}>
                            Messages
                        </Typography>
                        <IconButton onClick={() => setOpenNewChat(true)} sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)' }}>
                            <AddIcon />
                        </IconButton>
                    </Stack>

                    {/* Search */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.default',
                        borderRadius: 3,
                        px: 2,
                        py: 1.2
                    }}>
                        <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                        <InputBase
                            placeholder="Search chats..."
                            fullWidth
                            sx={{ fontSize: '0.95rem' }}
                        />
                    </Box>
                </Box>

                {/* Chat List */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2 }}>
                    <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, px: 2, display: 'block', mb: 1 }}>
                        Recent
                    </Typography>
                    <List disablePadding>
                        {isLoading && <Typography sx={{ p: 2, color: 'text.secondary' }}>Loading...</Typography>}
                        {chats && chats.map((chat) => (
                            <ListItemButton
                                key={chat.id}
                                selected={selectedChat === chat.id}
                                onClick={() => setSelectedChat(chat.id)}
                                sx={{
                                    borderRadius: 3,
                                    mb: 1,
                                    py: 1.5,
                                    px: 2,
                                    bgcolor: selectedChat === chat.id ? 'primary.light' : 'transparent',
                                    color: selectedChat === chat.id ? 'white' : 'text.primary',
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    },
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                            >
                                <Badge color="success" variant="dot" overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                    <Avatar sx={{
                                        width: 48,
                                        height: 48,
                                        bgcolor: selectedChat === chat.id ? 'white' : 'primary.light',
                                        color: selectedChat === chat.id ? 'primary.main' : 'white',
                                        mr: 2,
                                        fontWeight: 'bold'
                                    }}>
                                        {chat.name ? chat.name[0].toUpperCase() : 'C'}
                                    </Avatar>
                                </Badge>
                                <ListItemText
                                    primary={chat.name || `Chat ${chat.id}`}
                                    primaryTypographyProps={{ fontWeight: selectedChat === chat.id ? 700 : 600, fontSize: '0.95rem' }}
                                    secondary="Last message..." // Placeholder
                                    secondaryTypographyProps={{
                                        fontSize: '0.8rem',
                                        color: selectedChat === chat.id ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                                        noWrap: true
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* User Profile (Bottom) */}
                <Divider sx={{ mx: 2, my: 1 }} />
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'secondary.main', mr: 2 }} src={`https://ui-avatars.com/api/?name=${currentUser?.username}&background=random`}>
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" fontWeight="700">
                            {currentUser?.username || 'User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            My Account
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={handleLogout} sx={{ color: 'text.secondary' }}>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Paper>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
                {selectedChat ? (
                    <ChatWindow chatId={selectedChat} />
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
                        <Box sx={{
                            width: 200,
                            height: 200,
                            bgcolor: 'rgba(99, 102, 241, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 4
                        }}>
                            <Typography variant="h1" sx={{ fontSize: 80 }}>👋</Typography>
                        </Box>
                        <Typography variant="h4" fontWeight="800" gutterBottom color="text.primary">
                            Welcome, {currentUser?.username}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Select a conversation from the sidebar to start chatting.
                        </Typography>
                    </Box>
                )}
            </Box>

            <CreateChatDialog open={openNewChat} onClose={() => setOpenNewChat(false)} />
        </Box>
    );
};

export default ChatDashboard;
