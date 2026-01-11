import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemButton, ListItemText, DialogActions, Button, CircularProgress } from '@mui/material';
import { useLazySearchUsersQuery } from '../features/user/userApi';
import { useCreateChatMutation } from '../features/chat/chatApi';

interface CreateChatDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateChatDialog: React.FC<CreateChatDialogProps> = ({ open, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [triggerSearch, { data: users, isLoading }] = useLazySearchUsersQuery();
    const [createChat] = useCreateChatMutation();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.trim()) {
                triggerSearch(searchTerm);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, triggerSearch]);

    const handleUserClick = async (userId: number) => {
        try {
            await createChat({ type: 'private', partnerId: userId }).unwrap();
            onClose();
        } catch (err) {
            console.error('Failed to create chat:', err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>New Chat</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Search Users"
                    fullWidth
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isLoading && <CircularProgress size={24} sx={{ mt: 2 }} />}
                <List>
                    {users?.map((user) => (
                        <ListItem key={user.id} disablePadding>
                            <ListItemButton onClick={() => handleUserClick(user.id)}>
                                <ListItemText primary={user.username} secondary={user.email} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {users && users.length === 0 && searchTerm && !isLoading && (
                        <ListItem><ListItemText primary="No users found" /></ListItem>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateChatDialog;
