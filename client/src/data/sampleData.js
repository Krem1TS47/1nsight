// Sample hardcoded data for development and demo purposes

export const userStats = {
  serving: 120,
  passing: 98,
  setting: 86,
  spiking: 99,
  blocking: 85,
  digging: 65,
}

export const radarChartData = [
  { subject: 'Serving', A: 120, B: 110, fullMark: 150 },
  { subject: 'Passing', A: 98, B: 130, fullMark: 150 },
  { subject: 'Setting', A: 86, B: 130, fullMark: 150 },
  { subject: 'Spiking', A: 99, B: 100, fullMark: 150 },
  { subject: 'Blocking', A: 85, B: 90, fullMark: 150 },
  { subject: 'Digging', A: 65, B: 85, fullMark: 150 },
]

export const matchHistory = [
  { id: 1, date: '2025-03-15', opponent: 'Thunder Spikes', score: '3-1', result: 'Win', points: 78 },
  { id: 2, date: '2025-03-12', opponent: 'Wave Riders', score: '2-3', result: 'Loss', points: 65 },
  { id: 3, date: '2025-03-08', opponent: 'Sky Smashers', score: '3-0', result: 'Win', points: 82 },
  { id: 4, date: '2025-03-05', opponent: 'Net Ninjas', score: '3-2', result: 'Win', points: 75 },
  { id: 5, date: '2025-03-01', opponent: 'Court Kings', score: '1-3', result: 'Loss', points: 58 },
  { id: 6, date: '2025-02-27', opponent: 'Ace Warriors', score: '3-1', result: 'Win', points: 80 },
]

export const performanceTrends = [
  { month: 'Oct', serving: 95, passing: 85, setting: 75, spiking: 90, blocking: 70, digging: 60 },
  { month: 'Nov', serving: 105, passing: 88, setting: 78, spiking: 92, blocking: 75, digging: 58 },
  { month: 'Dec', serving: 110, passing: 92, setting: 82, spiking: 95, blocking: 80, digging: 62 },
  { month: 'Jan', serving: 115, passing: 95, setting: 84, spiking: 97, blocking: 82, digging: 64 },
  { month: 'Feb', serving: 118, passing: 96, setting: 85, spiking: 98, blocking: 84, digging: 63 },
  { month: 'Mar', serving: 120, passing: 98, setting: 86, spiking: 99, blocking: 85, digging: 65 },
]

export const statsCards = [
  {
    title: 'Total Matches',
    value: '24',
    change: '+2 from last month',
    icon: 'BarChart3'
  },
  {
    title: 'Win Rate',
    value: '67%',
    change: '+5% from last month',
    icon: 'TrendingUp'
  },
  {
    title: 'Skill Score',
    value: '8.5',
    change: '+0.3 from last month',
    icon: 'Activity'
  }
]

export const recentAchievements = [
  { id: 1, title: 'Ace Master', description: '10 aces in a single match', date: '2025-03-15', icon: '🏆' },
  { id: 2, title: 'Block Beast', description: 'Achieved 8 blocks in one game', date: '2025-03-08', icon: '🛡️' },
  { id: 3, title: 'Perfect Passer', description: '95% passing accuracy', date: '2025-03-01', icon: '🎯' },
]

export const teamComparison = {
  labels: ['Serving', 'Passing', 'Setting', 'Spiking', 'Blocking', 'Digging'],
  playerA: { name: 'You', data: [120, 98, 86, 99, 85, 65] },
  playerB: { name: 'Team Average', data: [110, 130, 130, 100, 90, 85] },
}
