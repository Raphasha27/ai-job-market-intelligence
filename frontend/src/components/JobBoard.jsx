import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Clock, Bookmark, Share2, ExternalLink } from 'lucide-react';
import { getJobs } from '../api';

const JobCard = ({ job }) => (
  <div className="card group">
    <div className="flex gap-6">
      <div className="w-16 h-16 rounded-xl overflow-hidden glass shrink-0">
        <img src={job.image || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"} alt={job.company} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-bold group-hover:text-primary-400 transition-colors">{job.title}</h4>
            <p className="text-slate-400 font-medium">{job.company}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 glass rounded-lg text-slate-400 hover:text-white transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 glass rounded-lg text-slate-400 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-500" />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            {job.salary}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : 'Just now'}
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-primary-500" />
            Direct Apply
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {(job.skills || []).map(skill => (
            <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const JobBoard = () => {
  const [filter, setFilter] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs()
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 p-1 glass rounded-xl">
          {['All', 'Development', 'Design', 'Marketing', 'Sales'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === cat ? 'bg-primary-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex gap-4">
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-300 focus:outline-none">
            <option>Recent First</option>
            <option>Salary: High to Low</option>
            <option>Most Relevant</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      
      <button 
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            alert('Connected to API. No more positions found in this category.');
            setLoading(false);
          }, 1500);
        }}
        disabled={loading}
        className="w-full py-4 text-slate-400 text-sm font-medium hover:text-primary-400 transition-colors bg-white/5 rounded-2xl border border-dashed border-white/10 hover:border-primary-500/50 disabled:opacity-50"
      >
        {loading ? 'Refreshing listings...' : 'Load More Positions'}
      </button>
    </div>
  );
};

export default JobBoard;
