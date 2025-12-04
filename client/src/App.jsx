import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Activity, LogOut, LogIn } from 'lucide-react'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/dashboard/Analytics'
import AIInsights from './pages/dashboard/AIInsights'
import Goals from './pages/dashboard/Goals'
import StatsHub from './pages/dashboard/StatsHub'
import './App.css'

function Navigation({ isAuthenticated, user, setShowAuthModal, setIsLoginMode, handleLogout }) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav className="w-full border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <div className="w-full px-6 lg:px-12">
                <div className="flex h-16 items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <Activity className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">1nsight</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {location.pathname.startsWith('/dashboard') && (
                            <Button
                                onClick={() => navigate('/')}
                                variant="ghost"
                                size="sm"
                            >
                                Home
                            </Button>
                        )}

                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-muted-foreground hidden sm:inline">
                                    {user?.email}
                                </span>
                                <Button onClick={handleLogout} variant="ghost" size="sm">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => { setShowAuthModal(true); setIsLoginMode(true); }}
                                    variant="ghost"
                                    size="sm"
                                >
                                    <LogIn className="h-4 w-4 mr-2" />
                                    Login
                                </Button>
                                <Button
                                    onClick={() => { setShowAuthModal(true); setIsLoginMode(false); }}
                                    size="sm"
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

function AuthModal({ showAuthModal, setShowAuthModal, isLoginMode, setIsLoginMode, handleAuth, email, setEmail, password, setPassword, isLoading }) {
    if (!showAuthModal) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-md mx-4">
                <CardHeader>
                    <CardTitle>{isLoginMode ? 'Login' : 'Create Account'}</CardTitle>
                    <CardDescription>
                        {isLoginMode ? 'Welcome back to 1nsight' : 'Start tracking your volleyball journey'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Loading...' : (isLoginMode ? 'Login' : 'Sign Up')}
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full"
                                onClick={() => setIsLoginMode(!isLoginMode)}
                            >
                                {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowAuthModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

function AppContent() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        if (token && userData) {
            setIsAuthenticated(true)
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleAuth = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const endpoint = isLoginMode ? 'login' : 'signup'
            const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.error || `${isLoginMode ? 'Login' : 'Signup'} failed`)
                return
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            setIsAuthenticated(true)
            setUser(data.user)
            setShowAuthModal(false)
            setEmail('')
            setPassword('')
        } catch (error) {
            console.error('Auth error:', error)
            alert('Network error. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <div className="min-h-screen w-full bg-background">
            <Navigation
                isAuthenticated={isAuthenticated}
                user={user}
                setShowAuthModal={setShowAuthModal}
                setIsLoginMode={setIsLoginMode}
                handleLogout={handleLogout}
            />

            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/analytics" element={<Analytics />} />
                <Route path="/dashboard/ai-insights" element={<AIInsights />} />
                <Route path="/dashboard/goals" element={<Goals />} />
                <Route path="/dashboard/stats-hub" element={<StatsHub />} />
            </Routes>

            <AuthModal
                showAuthModal={showAuthModal}
                setShowAuthModal={setShowAuthModal}
                isLoginMode={isLoginMode}
                setIsLoginMode={setIsLoginMode}
                handleAuth={handleAuth}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLoading={isLoading}
            />
        </div>
    )
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App
