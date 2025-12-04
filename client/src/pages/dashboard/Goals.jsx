import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Target, TrendingUp, Edit2, Save, X } from 'lucide-react'
import { userStats } from '../../data/sampleData'

export default function Goals() {
  const navigate = useNavigate()

  const [goals, setGoals] = useState({
    serving: 130,
    passing: 120,
    setting: 100,
    spiking: 110,
    blocking: 100,
    digging: 80
  })

  const [editingGoal, setEditingGoal] = useState(null)
  const [tempGoalValue, setTempGoalValue] = useState('')

  const metrics = [
    { key: 'serving', label: 'Serving', color: '#3b82f6' },
    { key: 'passing', label: 'Passing', color: '#10b981' },
    { key: 'setting', label: 'Setting', color: '#f59e0b' },
    { key: 'spiking', label: 'Spiking', color: '#ef4444' },
    { key: 'blocking', label: 'Blocking', color: '#8b5cf6' },
    { key: 'digging', label: 'Digging', color: '#ec4899' }
  ]

  const calculateProgress = (current, goal) => {
    return Math.min(100, Math.round((current / goal) * 100))
  }

  const handleEditGoal = (metricKey) => {
    setEditingGoal(metricKey)
    setTempGoalValue(goals[metricKey].toString())
  }

  const handleSaveGoal = (metricKey) => {
    const newValue = parseInt(tempGoalValue)
    if (newValue >= 0 && newValue <= 150) {
      setGoals(prev => ({ ...prev, [metricKey]: newValue }))
      setEditingGoal(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingGoal(null)
    setTempGoalValue('')
  }

  return (
    <div className="w-full px-6 lg:px-12 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Goal Setting</h1>
        <p className="text-muted-foreground">
          Set targets for your skills and track your progress towards them
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 max-w-7xl mx-auto">
        <Card className="border-2 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Overall Progress
            </CardTitle>
            <CardDescription>Your average progress across all goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-green-500 transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        metrics.reduce((acc, m) => acc + calculateProgress(userStats[m.key], goals[m.key]), 0) / metrics.length
                      )}%`
                    }}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold">
                {Math.round(
                  metrics.reduce((acc, m) => acc + calculateProgress(userStats[m.key], goals[m.key]), 0) / metrics.length
                )}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Goals */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Individual Goals</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {metrics.map((metric) => {
            const current = userStats[metric.key]
            const goal = goals[metric.key]
            const progress = calculateProgress(current, goal)
            const remaining = Math.max(0, goal - current)
            const isEditing = editingGoal === metric.key

            return (
              <Card key={metric.key} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: metric.color }}
                      />
                      {metric.label}
                    </CardTitle>
                    {!isEditing ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditGoal(metric.key)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSaveGoal(metric.key)}
                        >
                          <Save className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current vs Goal */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="text-2xl font-bold" style={{ color: metric.color }}>
                        {current}
                      </p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Goal</p>
                      {!isEditing ? (
                        <p className="text-2xl font-bold">{goal}</p>
                      ) : (
                        <Input
                          type="number"
                          min="0"
                          max="150"
                          value={tempGoalValue}
                          onChange={(e) => setTempGoalValue(e.target.value)}
                          className="w-20 text-2xl font-bold"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-bold">{progress}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: metric.color
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className="text-lg font-bold">{remaining}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className={`text-lg font-bold ${progress >= 100 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {progress >= 100 ? 'Achieved!' : 'In Progress'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your goals effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button
                variant="outline"
                onClick={() => {
                  // Set all goals to +20 from current
                  setGoals({
                    serving: userStats.serving + 20,
                    passing: userStats.passing + 20,
                    setting: userStats.setting + 20,
                    spiking: userStats.spiking + 20,
                    blocking: userStats.blocking + 20,
                    digging: userStats.digging + 20
                  })
                }}
              >
                Set +20 Goals
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Reset to default goals
                  setGoals({
                    serving: 130,
                    passing: 120,
                    setting: 100,
                    spiking: 110,
                    blocking: 100,
                    digging: 80
                  })
                }}
              >
                Reset to Defaults
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/analytics')}>
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
