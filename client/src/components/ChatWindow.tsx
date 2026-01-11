import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, IconButton, Typography, List, ListItem, Avatar, Paper, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
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
                    refetch();
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
            {/* Header */}
            <Paper elevation={0} sx={{
                p: 2,
                px: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white'
            }}>
                <Box>
                    <Typography variant="h6" fontWeight="700">Chat Room</Typography>
                    <Typography variant="caption" color="text.secondary">Active now</Typography>
                </Box>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Paper>

            {/* Messages Area */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4, display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
                <List sx={{ width: '100%' }}>
                    {messages?.slice().reverse().map((msg, index) => {
                        const isOwn = msg.senderId === userId;
                        return (
                            <ListItem
                                key={msg._id}
                                disablePadding
                                sx={{
                                    display: 'flex',
                                    justifyContent: isOwn ? 'flex-end' : 'flex-start',
                                    mb: 2,
                                    width: '100%'
                                }}
                            >
                                <Stack direction={isOwn ? 'row-reverse' : 'row'} spacing={1.5} alignItems="flex-end" sx={{ maxWidth: '80%' }}>
                                    {!isOwn && (
                                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light', fontSize: '0.8rem' }}>
                                            U{msg.senderId}
                                        </Avatar>
                                    )}

                                    <Paper
                                        elevation={isOwn ? 4 : 1}
                                        sx={{
                                            p: 2,
                                            px: 2.5,
                                            borderRadius: 2.5,
                                            borderBottomRightRadius: isOwn ? 4 : 20,
                                            borderBottomLeftRadius: isOwn ? 20 : 4,
                                            bgcolor: isOwn ? 'primary.main' : 'white',
                                            color: isOwn ? 'white' : 'text.primary',
                                            position: 'relative'
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                                            {msg.content}
                                        </Typography>
                                        <Typography variant="caption" sx={{
                                            display: 'block',
                                            mt: 0.5,
                                            textAlign: 'right',
                                            opacity: 0.7,
                                            fontSize: '0.65rem'
                                        }}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                    </Paper>
                                </Stack>
                            </ListItem>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </List>
            </Box>

            {/* Input Area */}
            <Paper elevation={0} sx={{
                p: 2,
                px: 4,
                bgcolor: 'white',
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <AttachFileIcon />
                </IconButton>

                <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8fafc',
                            borderRadius: 50,
                            pr: 1
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton size="small" sx={{ color: 'text.secondary' }}>
                                <InsertEmoticonIcon />
                            </IconButton>
                        )
                    }}
                />

                <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' },
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)'
                    }}
                >
                    <SendIcon fontSize="small" />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default ChatWindow;
