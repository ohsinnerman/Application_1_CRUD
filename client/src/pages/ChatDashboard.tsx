import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Avatar, Toolbar, AppBar, IconButton, Menu, MenuItem } from '@mui/material';
import { useGetChatsQuery } from '../features/chat/chatApi';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatWindow from '../components/ChatWindow';
import CreateChatDialog from '../components/CreateChatDialog';
import { Button } from '@mui/material';

const drawerWidth = 300;

const ChatDashboard = () => {
    const { data: chats, isLoading } = useGetChatsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [openNewChat, setOpenNewChat] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        MERN Chat
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ p: 2 }}>
                    <Button variant="contained" fullWidth onClick={() => setOpenNewChat(true)}>
                        New Chat
                    </Button>
                </Box>
                <Divider />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {isLoading && <ListItem><ListItemText primary="Loading..." /></ListItem>}
                        {chats && chats.map((chat) => (
                            <ListItem key={chat.id} disablePadding>
                                <ListItemButton onClick={() => setSelectedChat(chat.id)} selected={selectedChat === chat.id}>
                                    <Avatar sx={{ mr: 2 }}>{chat.name ? chat.name[0] : 'C'}</Avatar>
                                    <ListItemText primary={chat.name || `Chat ${chat.id}`} secondary={chat.type} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <CreateChatDialog open={openNewChat} onClose={() => setOpenNewChat(false)} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Toolbar />
                {selectedChat ? (
                    <ChatWindow chatId={selectedChat} />
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="h6" color="text.secondary">
                            Select a chat to start messaging
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ChatDashboard;
