import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Database, Save, RotateCcw, TrendingUp } from 'lucide-react'
import { userStats, matchHistory } from '../../data/sampleData'

export default function StatsHub() {
  const navigate = useNavigate()

  const [currentStats, setCurrentStats] = useState({ ...userStats })
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const metrics = [
    { key: 'serving', label: 'Serving', color: '#3b82f6', description: 'Serve accuracy and power' },
    { key: 'passing', label: 'Passing', color: '#10b981', description: 'Reception and ball control' },
    { key: 'setting', label: 'Setting', color: '#f59e0b', description: 'Set accuracy and placement' },
    { key: 'spiking', label: 'Spiking', color: '#ef4444', description: 'Attack power and accuracy' },
    { key: 'blocking', label: 'Blocking', color: '#8b5cf6', description: 'Block effectiveness' },
    { key: 'digging', label: 'Digging', color: '#ec4899', description: 'Defensive plays and digs' }
  ]

  const handleStatChange = (metricKey, value) => {
    const numValue = parseInt(value) || 0
    const clampedValue = Math.max(0, Math.min(150, numValue))
    setCurrentStats(prev => ({ ...prev, [metricKey]: clampedValue }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Please log in to save your stats')
        return
      }

      const res = await fetch('http://localhost:5000/api/vbdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentStats)
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Failed to save stats')
        return
      }

      setHasChanges(false)
      alert('Stats saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save stats. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setCurrentStats({ ...userStats })
    setHasChanges(false)
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Player Stats Hub</h1>
        <p className="text-muted-foreground">
          Enter match results and manage your volleyball statistics
        </p>
      </div>

      {/* Action Buttons */}
      {hasChanges && (
        <div className="mb-6 max-w-7xl mx-auto">
          <Card className="border-2 border-yellow-500/50 bg-yellow-500/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">You have unsaved changes</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={isSaving}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Entry Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Current Statistics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => {
            const value = currentStats[metric.key]
            const originalValue = userStats[metric.key]
            const hasChanged = value !== originalValue

            return (
              <Card key={metric.key} className={`border-2 ${hasChanged ? 'border-primary/50' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                    {metric.label}
                  </CardTitle>
                  <CardDescription>{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={metric.key}>Score (0-150)</Label>
                      <Input
                        id={metric.key}
                        type="number"
                        min="0"
                        max="150"
                        value={value}
                        onChange={(e) => handleStatChange(metric.key, e.target.value)}
                        className="text-2xl font-bold mt-2"
                        style={{ borderColor: hasChanged ? metric.color : '' }}
                      />
                    </div>

                    {/* Visual Progress Bar */}
                    <div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${(value / 150) * 100}%`,
                            backgroundColor: metric.color
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {value} / 150 ({Math.round((value / 150) * 100)}%)
                      </p>
                    </div>

                    {hasChanged && (
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-primary">
                          {value > originalValue ? '+' : ''}{value - originalValue} from original
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Match History */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Match History</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Last 6 Matches
            </CardTitle>
            <CardDescription>Your recent match performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matchHistory.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        match.result === 'Win' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <p className="font-medium">{match.opponent}</p>
                      <p className="text-sm text-muted-foreground">{match.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="font-bold">{match.score}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Points</p>
                      <p className="font-bold">{match.points}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        match.result === 'Win'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      {match.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/analytics')}>
                View Analytics
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard/goals')}>
                Check Goals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
