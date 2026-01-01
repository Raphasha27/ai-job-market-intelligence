import React from 'react';
import { MapPin, Info } from 'lucide-react';

const cities = [
  { name: 'Johannesburg', skills: ['Financial Tech', 'Java', 'Cloud (AWS/Azure)', 'Data Science'], intensity: 'h-48' },
  { name: 'Cape Town', skills: ['Software Engineering', 'E-commerce', 'UX/UI', 'AI/ML'], intensity: 'h-40' },
  { name: 'Durban', skills: ['Logistics Ops', 'Web Dev', 'Cybersecurity'], intensity: 'h-24' },
  { name: 'Pretoria', skills: ['Public Sector IT', 'Network Eng', 'Security'], intensity: 'h-32' },
  { name: 'Gqeberha', skills: ['Industrial Automation', 'IoT'], intensity: 'h-20' },
];

const SkillsHeatmap = () => {
  return (
    <div className="space-y-8 animate-in zoom-in duration-500">
      <div className="card border-primary-500/20 bg-primary-500/5">
        <div className="flex gap-4">
          <Info className="w-6 h-6 text-primary-400 shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-white">South Africa Tech Skills Concentration</h3>
            <p className="text-sm text-slate-400 mt-1">This visualization shows the density of tech skills across major metropolitan areas in South Africa. Intelligence is updated daily based on hiring activity.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
        {cities.map((city) => (
          <div key={city.name} className="flex flex-col items-center group">
            <div className={`w-full ${city.intensity} glass rounded-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-primary-500/20 border-primary-500/10`}>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-500/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <MapPin className="text-primary-400 w-8 h-8 drop-shadow-lg" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-bold text-white">{city.name}</h4>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {city.skills.slice(0, 2).map(skill => (
                  <span key={skill} className="text-[10px] uppercase font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-6">Regional Skill In-Demand Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cities.map(city => (
            <div key={city.name} className="p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-primary-400">{city.name}</h4>
                <span className="text-xs text-slate-500">Tier 1 Market</span>
              </div>
              <div className="space-y-3">
                {city.skills.map(skill => (
                  <div key={skill} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{skill}</span>
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-600 to-accent-600" style={{ width: `${Math.random() * 60 + 40}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsHeatmap;
