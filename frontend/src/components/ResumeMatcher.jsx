import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, Wand2 } from 'lucide-react';
import { matchResume } from '../api';

const ResumeMatcher = () => {
  const [matching, setMatching] = useState(false);
  const [result, setResult] = useState(null);

  const startMatch = () => {
    setMatching(true);
    // Mimicking a file upload and analysis
    matchResume("Sample resume text content...")
      .then(res => {
        setResult(res.data);
        setMatching(false);
      })
      .catch(err => {
        console.error(err);
        setMatching(false);
        // Fallback for demo
        setResult({
          score: 85,
          matches: [
            "React architecture matches Senior Frontend roles",
            "5 years of experience aligns with Cloud Architect needs"
          ],
          gaps: ["Kubernetes", "AWS Certification"]
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-top duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-xl shadow-primary-500/20 mb-4">
          <Wand2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">AI Resume-to-Job Matcher</h2>
        <p className="text-slate-400 max-w-lg mx-auto">Upload your resume and let our AI compare your skills against thousands of active job postings to find your perfect match.</p>
      </div>

      {!result && !matching && (
        <div 
          className="border-2 border-dashed border-white/10 rounded-3xl p-16 flex flex-col items-center justify-center hover:border-primary-500/40 hover:bg-primary-500/5 transition-all cursor-pointer group"
          onClick={startMatch}
        >
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary-400" />
          </div>
          <p className="text-lg font-semibold mb-2">Drop your resume here</p>
          <p className="text-sm text-slate-500">Supports PDF, DOCX up to 10MB</p>
          <button className="btn-primary mt-8">
            Select Files
          </button>
        </div>
      )}

      {matching && (
        <div className="card text-center py-16 space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-primary-500 rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary-400 animate-pulse" />
          </div>
          <p className="text-xl font-medium animate-pulse">Analyzing Resume with AI Models...</p>
          <div className="max-w-xs mx-auto space-y-2">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Extraction in progress</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="card flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - result.score / 100)} className="text-primary-500" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">
                  {result.score}%
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Overall Market Match</h3>
                <p className="text-slate-400">Excellent compatibility for SA Tech Hubs</p>
              </div>
            </div>
            <button onClick={() => setResult(null)} className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
              Reset Analysis
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card border-green-500/20 bg-green-500/5">
              <h4 className="flex items-center gap-2 font-bold mb-4 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                Key Matches
              </h4>
              <ul className="space-y-3">
                {result.matches.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300 pl-4 border-l-2 border-green-500/30">{item}</li>
                ))}
              </ul>
            </div>
            <div className="card border-orange-500/20 bg-orange-500/5">
              <h4 className="flex items-center gap-2 font-bold mb-4 text-orange-400">
                <AlertCircle className="w-5 h-5" />
                Identified Gaps
              </h4>
              <ul className="space-y-3">
                {result.gaps.map((item, i) => (
                  <li key={i} className="text-sm text-slate-300 pl-4 border-l-2 border-orange-500/30">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="card">
            <h4 className="font-bold mb-4 italic text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Recommended Career Paths
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Solution Architect', 'Full Stack Lead', 'DevOps Specialist'].map(path => (
                <div key={path} className="p-4 rounded-xl glass border-primary-500/10 hover:border-primary-500/50 transition-colors cursor-pointer group">
                  <p className="font-bold group-hover:text-primary-400 transition-colors">{path}</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-tighter">92% Match</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMatcher;
