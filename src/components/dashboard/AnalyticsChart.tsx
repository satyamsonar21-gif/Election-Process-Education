"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';

interface AnalyticsChartProps {
  quizScores: any[];
}

export default function AnalyticsChart({ quizScores }: AnalyticsChartProps) {
  if (!quizScores || quizScores.length === 0) {
    return null;
  }

  // Format data for Recharts
  const data = quizScores.map((score, index) => ({
    name: `Quiz ${index + 1}`,
    score: (score.score / score.total) * 100, // percentage
    date: new Date(score.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
        <Brain className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-bold text-slate-900">Performance Over Time</h2>
      </div>
      <div className="p-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`${Number(value).toFixed(0)}%`, 'Score']}
            />
            <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
