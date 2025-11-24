import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import AccountButtons from './components/accountButtons';
import PlayerRadarChart from './components/playerRadarChart';
import './App.css';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    shape: {
        borderRadius: 12,
    },
});

const radarChartData = [
    {
        subject: 'Serving',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Passing',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Setting',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Spiking',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: 'Blocking',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: 'Digging',
        A: 65,
        B: 85,
        fullMark: 150,
    },
];


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        1nsight
                    </Typography>
                    <AccountButtons />
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        1nsight
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        take your volleyball game to the next level
                    </Typography>
                    <PlayerRadarChart data={radarChartData} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
