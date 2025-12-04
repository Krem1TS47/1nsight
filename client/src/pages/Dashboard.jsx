import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, BarChart3, TrendingUp, Target, MessageSquare, Database, ArrowRight } from 'lucide-react'
import { statsCards } from '../data/sampleData'

export default function Dashboard() {
  const navigate = useNavigate()

  const dashboardSections = [
    {
      id: 'analytics',
      title: 'Progress Analytics',
      description: 'Track your performance over time with detailed charts and statistics',
      icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
      path: '/dashboard/analytics',
      color: 'border-blue-500/50 hover:border-blue-500'
    },
    {
      id: 'ai-insights',
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations and analysis from our AI coach',
      icon: <MessageSquare className="h-10 w-10 text-purple-500" />,
      path: '/dashboard/ai-insights',
      color: 'border-purple-500/50 hover:border-purple-500'
    },
    {
      id: 'goals',
      title: 'Goal Setting',
      description: 'Set targets for your skills and track your progress towards them',
      icon: <Target className="h-10 w-10 text-green-500" />,
      path: '/dashboard/goals',
      color: 'border-green-500/50 hover:border-green-500'
    },
    {
      id: 'stats-hub',
      title: 'Player Stats Hub',
      description: 'Enter match results and manage your volleyball statistics',
      icon: <Database className="h-10 w-10 text-orange-500" />,
      path: '/dashboard/stats-hub',
      color: 'border-orange-500/50 hover:border-orange-500'
    }
  ]

  return (
    <div className="w-full px-6 lg:px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Choose a section to get started
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5</div>
            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Sections */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Dashboard Sections</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {dashboardSections.map((section) => (
            <Card
              key={section.id}
              className={`cursor-pointer transition-all hover:shadow-lg border-2 ${section.color}`}
              onClick={() => navigate(section.path)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 text-xl mb-2">
                      {section.icon}
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {section.description}
                    </CardDescription>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Open {section.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" onClick={() => navigate('/dashboard/stats-hub')}>
                Log New Match
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/analytics')}>
                View Progress
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/goals')}>
                Set New Goal
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/ai-insights')}>
                Ask AI Coach
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
