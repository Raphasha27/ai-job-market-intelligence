import React, { useState } from 'react';
import { Layout, BarChart, TrendingUp, Search, User, MapPin, Briefcase, BrainCircuit, FileSearch, Sparkles } from 'lucide-react';
import Dashboard from './components/Dashboard';
import JobBoard from './components/JobBoard';
import SkillsHeatmap from './components/SkillsHeatmap';
import ResumeMatcher from './components/ResumeMatcher';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const tabs = [
    { id: 'dashboard', name: 'Intelligence Dashboard', icon: TrendingUp },
    { id: 'jobs', name: 'Job Aggregator', icon: Briefcase },
    { id: 'heatmap', name: 'SA Tech Heatmap', icon: MapPin },
    { id: 'matcher', name: 'AI Resume Matcher', icon: BrainCircuit },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 glass border-r border-white/5 flex flex-col z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">AI Job<span className="text-primary-400">Sphere</span></h1>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === tab.id 
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-sm' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="glass rounded-xl p-4 bg-primary-500/5 border border-primary-500/10">
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">AI Insight</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cloud Computing demand in South Africa has increased by <span className="text-green-400 font-bold">24%</span> this month.
            </p>
          </div>
          
          <button 
            onClick={() => { setModalType('profile'); setShowModal(true); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-all"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">My Profile</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Top Header */}
        <header className="sticky top-0 z-10 glass border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <p className="text-sm text-slate-400">Market intelligence powered by advanced AI models</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search jobs, skills, or trends..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 w-64 transition-all"
              />
            </div>
            <button 
              onClick={() => { setModalType('post-job'); setShowModal(true); }}
              className="btn-primary"
            >
              Post a Job
            </button>
          </div>
        </header>

        {/* Dynamic Section */}
        <div className="p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'jobs' && <JobBoard />}
          {activeTab === 'heatmap' && <SkillsHeatmap />}
          {activeTab === 'matcher' && <ResumeMatcher />}
        </div>
        {/* Modal Overlay */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="card max-w-lg w-full relative z-10 animate-in zoom-in duration-300">
              <h3 className="text-xl font-bold mb-4">
                {modalType === 'profile' ? 'User Profile' : 'Post a New Job'}
              </h3>
              <div className="space-y-4 py-4">
                {modalType === 'profile' ? (
                  <div className="flex flex-col items-center gap-4 py-6">
                    <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center border-2 border-primary-500/50">
                      <User className="w-10 h-10 text-primary-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">Raphasha27</p>
                      <p className="text-slate-400 text-sm">Lead AI Developer</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full mt-4">
                      <div className="p-3 bg-white/5 rounded-xl text-center">
                        <p className="text-xs text-slate-500 uppercase">Followers</p>
                        <p className="font-bold">1.2k</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl text-center">
                        <p className="text-xs text-slate-500 uppercase">Projects</p>
                        <p className="font-bold">42</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Job Title</label>
                      <input type="text" placeholder="e.g. Senior Software Engineer" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Description</label>
                      <textarea placeholder="Describe the role..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-medium transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    alert(modalType === 'profile' ? 'Profile saved successfully!' : 'Job post submitted for review!');
                    setShowModal(false);
                  }}
                  className="flex-1 btn-primary"
                >
                  {modalType === 'profile' ? 'Save Changes' : 'Submit Posting'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
