import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, IconButton, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useGetMessagesQuery } from '../features/chat/messageApi';
import { useSocket } from '../context/SocketContext';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface ChatWindowProps {
    chatId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const { data: messages, refetch } = useGetMessagesQuery({ chatId });
    const [newMessage, setNewMessage] = useState('');
    const { socket } = useSocket();
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (socket && chatId) {
            socket.emit('join_room', chatId.toString());

            const handleMessage = (message: any) => {
                if (message.chatId === chatId) {
                    refetch(); // Simplest strategy: refetch. Better: update cache.
                }
            };

            socket.on('message_received', handleMessage);

            return () => {
                socket.off('message_received', handleMessage);
            };
        }
    }, [socket, chatId, refetch]);

    const handleSend = () => {
        if (newMessage.trim() && socket) {
            socket.emit('send_message', { chatId, content: newMessage });
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                <List>
                    {messages?.slice().reverse().map((msg) => (
                        <ListItem
                            key={msg._id}
                            sx={{
                                justifyContent: msg.senderId === userId ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 1.5,
                                    bgcolor: msg.senderId === userId ? 'primary.main' : 'background.paper',
                                    color: msg.senderId === userId ? 'primary.contrastText' : 'text.primary',
                                    maxWidth: '70%',
                                    wordBreak: 'break-word',
                                }}
                            >
                                <ListItemText
                                    primary={msg.content}
                                    secondary={new Date(msg.createdAt).toLocaleTimeString()}
                                    secondaryTypographyProps={{
                                        color: msg.senderId === userId ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                                        fontSize: '0.75rem'
                                    }}
                                />
                            </Paper>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Box>
            <Divider />
            <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    size="small"
                />
                <IconButton color="primary" onClick={handleSend} disabled={!newMessage.trim()}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatWindow;
