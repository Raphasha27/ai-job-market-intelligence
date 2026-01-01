import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, Zap, Globe } from 'lucide-react';
import { getTrends } from '../api';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const StatCard = ({ title, value, change, icon: Icon, isPositive }) => (
  <div className="card">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-primary-500/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary-400" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrends()
      .then(res => {
        setTrends(res.data.map(t => ({
          name: t.name,
          demand: t.demand_score,
          color: t.name === 'React' ? '#61dafb' : t.name === 'Python' ? '#3776ab' : '#0ea5e9'
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setTrends([
          { name: 'React', demand: 85, color: '#61dafb' },
          { name: 'Python', demand: 92, color: '#3776ab' },
          { name: 'Docker', demand: 78, color: '#2496ed' },
          { name: 'Tailwind', demand: 70, color: '#06b6d4' },
          { name: 'PostgreSQL', demand: 65, color: '#336791' },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Active Jobs" value="12,458" change="+12.5%" icon={Briefcase} isPositive={true} />
        <StatCard title="Tech Talent Pool" value="85.2k" change="+3.2%" icon={Users} isPositive={true} />
        <StatCard title="Average Salary" value="R 45,000" change="-1.2%" icon={Globe} isPositive={false} />
        <StatCard title="Urgent Postings" value="1,240" change="+18.4%" icon={Zap} isPositive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Chart */}
        <div className="card lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            Job Posting Trends <span className="text-xs font-normal text-slate-500">(Last 6 Months)</span>
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#0ea5e9' }}
                />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Demand */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-6">Top Required Skills</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#f1f5f9', fontSize: 12}} width={80} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="demand" radius={[0, 4, 4, 0]}>
                  {trends.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Insight Feed */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-6">AI Market Insights</h3>
          <div className="space-y-4">
            {[
              { text: "Python has overtaken Java for Backend roles in Gauteng.", type: "trend" },
              { text: "Remote work opportunities have decreased by 5% since Q3.", type: "alert" },
              { text: "AI/ML Engineer salaries in Cape Town are up by 15%.", type: "salary" },
              { text: "Cloud Security is the fastest growing niche this month.", type: "opportunity" }
            ].map((insight, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0 shadow-lg shadow-primary-500/50" />
                <p className="text-sm text-slate-300">{insight.text}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => alert('Generating AI-driven market report... This may take a few seconds.')}
            className="w-full mt-6 py-2 text-primary-400 text-sm font-medium hover:underline tracking-wide underline-offset-4"
          >
            Generate Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
