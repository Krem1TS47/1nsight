import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { performanceTrends, userStats } from '../../data/sampleData'

export default function Analytics() {
  const navigate = useNavigate()
  const [selectedMetric, setSelectedMetric] = useState('all')

  const metrics = [
    { key: 'serving', label: 'Serving', color: '#3b82f6' },
    { key: 'passing', label: 'Passing', color: '#10b981' },
    { key: 'setting', label: 'Setting', color: '#f59e0b' },
    { key: 'spiking', label: 'Spiking', color: '#ef4444' },
    { key: 'blocking', label: 'Blocking', color: '#8b5cf6' },
    { key: 'digging', label: 'Digging', color: '#ec4899' }
  ]

  const calculateTrend = (metricKey) => {
    const data = performanceTrends
    const firstValue = data[0][metricKey]
    const lastValue = data[data.length - 1][metricKey]
    const change = lastValue - firstValue
    const percentChange = ((change / firstValue) * 100).toFixed(1)
    return { change, percentChange, isPositive: change >= 0 }
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Progress Analytics</h1>
        <p className="text-muted-foreground">
          Track your performance over time with detailed charts and statistics
        </p>
      </div>

      {/* Metric Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mb-8 max-w-7xl mx-auto">
        {metrics.map((metric) => {
          const trend = calculateTrend(metric.key)
          return (
            <Card key={metric.key} className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" style={{ color: metric.color }}>
                  {userStats[metric.key]}
                </div>
                <div className={`flex items-center text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {trend.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {trend.percentChange}% ({trend.isPositive ? '+' : ''}{trend.change})
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Metric Filter */}
      <div className="mb-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedMetric === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedMetric('all')}
          >
            All Metrics
          </Button>
          {metrics.map((metric) => (
            <Button
              key={metric.key}
              variant={selectedMetric === metric.key ? 'default' : 'outline'}
              onClick={() => setSelectedMetric(metric.key)}
              style={selectedMetric === metric.key ? { backgroundColor: metric.color, borderColor: metric.color } : {}}
            >
              {metric.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>
              {selectedMetric === 'all'
                ? 'Your skill progression over the last 6 months'
                : `Your ${metrics.find(m => m.key === selectedMetric)?.label} progression over the last 6 months`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 150]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                {selectedMetric === 'all' ? (
                  metrics.map((metric) => (
                    <Line
                      key={metric.key}
                      type="monotone"
                      dataKey={metric.key}
                      stroke={metric.color}
                      strokeWidth={2}
                      dot={{ fill: metric.color, r: 4 }}
                      activeDot={{ r: 6 }}
                      name={metric.label}
                    />
                  ))
                ) : (
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={metrics.find(m => m.key === selectedMetric)?.color}
                    strokeWidth={3}
                    dot={{ fill: metrics.find(m => m.key === selectedMetric)?.color, r: 5 }}
                    activeDot={{ r: 8 }}
                    name={metrics.find(m => m.key === selectedMetric)?.label}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <div className="mt-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Analysis of your performance trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric) => {
                const trend = calculateTrend(metric.key)
                return (
                  <div key={metric.key} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: metric.color }}
                      />
                      <span className="font-medium">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {performanceTrends[0][metric.key]} → {performanceTrends[performanceTrends.length - 1][metric.key]}
                      </span>
                      <div className={`flex items-center gap-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.isPositive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-bold">{trend.percentChange}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
