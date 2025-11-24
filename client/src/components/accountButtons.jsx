import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    CircularProgress,
    IconButton,
    InputAdornment,
    Alert,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Login as LoginIcon,
    PersonAdd as PersonAddIcon,
    Logout as LogoutIcon,
    Email as EmailIcon,
} from '@mui/icons-material';

const API_BASE_URL = 'http://localhost:5000/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AccountButtons() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    const handleSignup = async (e) => {
        e?.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const res = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                showMessage(data.error || 'Failed to create account', 'error');
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setIsAuthenticated(true);
            setUser(data.user);
            showMessage(data.message || 'Account created successfully!', 'success');
            setEmail('');
            setPassword('');
            handleClose();
        } catch (error) {
            console.error('Signup error:', error);
            showMessage('Network error. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e?.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                showMessage(data.error || 'Login failed', 'error');
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setIsAuthenticated(true);
            setUser(data.user);
            showMessage(data.message || 'Login successful!', 'success');
            setEmail('');
            setPassword('');
            handleClose();
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Network error. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        showMessage('Logged out successfully', 'success');
    };

    const handleToggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setMessage('');
        setEmail('');
        setPassword('');
        setShowPassword(false);
    };

    if (isAuthenticated) {
        return (
            <Box>
                <Typography variant="body1" sx={{ mr: 2 }}>
                    Welcome, {user?.email}
                </Typography>
                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                    Logout
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Button color="inherit" onClick={() => { handleOpen(); setIsLoginMode(true); }}>Login</Button>
            <Button color="inherit" onClick={() => { handleOpen(); setIsLoginMode(false); }}>Signup</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {isLoginMode ? 'Login' : 'Sign Up'}
                    </Typography>
                    {message && (
                        <Alert
                            severity={messageType === 'success' ? 'success' : 'error'}
                            sx={{ mb: 2 }}
                            onClose={() => setMessage('')}
                        >
                            {message}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={isLoginMode ? handleLogin : handleSignup} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                            autoComplete="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                            autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                            inputProps={{ minLength: 6 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : (isLoginMode ? <LoginIcon /> : <PersonAddIcon />)}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {isLoading ? 'Loading...' : (isLoginMode ? 'Login' : 'Create Account')}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button
                                onClick={handleToggleMode}
                                color="primary"
                                size="small"
                                sx={{ textTransform: 'none' }}
                            >
                                {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}