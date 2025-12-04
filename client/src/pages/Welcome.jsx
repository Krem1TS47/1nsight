import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Database, Zap, Target, TrendingUp, Users } from 'lucide-react'

export default function Welcome() {
    const navigate = useNavigate()

    const features = [
        {
            icon: <TrendingUp className="h-8 w-8 text-primary" />,
            title: 'Progress Analytics',
            description: 'Visualize your improvement over time with detailed charts and trends'
        },
        {
            icon: <Target className="h-8 w-8 text-primary" />,
            title: 'Goal Setting',
            description: 'Set personal goals and track your journey to becoming a better player'
        },
        {
            icon: <Zap className="h-8 w-8 text-primary" />,
            title: 'AI-Powered Insights',
            description: 'Get personalized recommendations based on your performance data'
        },
        {
            icon: <Database className="h-8 w-8 text-primary" />,
            title: 'Database Storage',
            description: 'Log match results and keep track of all of your stats'
        }
    ]

    return (
        <div className="min-h-screen w-full bg-background">
            {/* Hero Section */}
            <section className="w-full px-6 lg:px-12 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center mb-6">
                        <Activity className="h-16 w-16 text-primary" />
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6">
                        Elevate Your Volleyball Game
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        1nsight is your ultimate volleyball performance tracker. Analyze your skills,
                        track your progress, and become the player you've always wanted to be.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
                            View Demo Dashboard
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full px-6 lg:px-12 py-16 bg-muted/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                            Everything You Need to Improve
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive tools designed specifically for volleyball players who want to excel
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="mb-4">{feature.icon}</div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="w-full px-6 lg:px-12 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Get started in three simple steps
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                                    1
                                </div>
                                <CardTitle>Create Your Profile</CardTitle>
                                <CardDescription className="text-base">
                                    Sign up and set up your player profile with your current skill levels
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                                    2
                                </div>
                                <CardTitle>Log Your Matches</CardTitle>
                                <CardDescription className="text-base">
                                    After each game, update your performance stats and track your progress
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                                    3
                                </div>
                                <CardTitle>Analyze & Improve</CardTitle>
                                <CardDescription className="text-base">
                                    Review your analytics, identify weak areas, and watch yourself improve
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full px-6 lg:px-12 py-20 bg-muted/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Ready to Take Your Game to the Next Level?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join 1nsight today and start tracking your volleyball journey
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/dashboard')}>
                            Try Demo Dashboard
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
