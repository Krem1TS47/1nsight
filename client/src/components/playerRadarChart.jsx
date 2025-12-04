import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

export default function PlayerRadarChart({ data }) {
    const fullMark = data.length > 0 ? data[0].fullMark : 150;

    return (
        <div className="w-full">
            <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#f9fafb', fontSize: 14, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, fullMark]}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Radar
                        name="Player A"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                        strokeWidth={2}
                    />
                    <Radar
                        name="Player B"
                        dataKey="B"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                        strokeWidth={2}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px', color: '#f9fafb' }}
                        iconType="circle"
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
