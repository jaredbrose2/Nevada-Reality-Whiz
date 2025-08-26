
import React from 'react';
import { LEARNING_MODULES } from '../constants';
import { Module } from '../types';
import { ModuleSelector } from './ModuleSelector';
import { LearningInterface } from './LearningInterface';

interface LearningDashboardProps {
  selectedModule: Module | null;
  onSelectModule: (module: Module) => void;
  onBack: () => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({ selectedModule, onSelectModule, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-brand-blue-dark">My Dashboard</h1>
        </header>
        
        {selectedModule ? (
          <LearningInterface module={selectedModule} onBack={onBack} />
        ) : (
          <ModuleSelector modules={LEARNING_MODULES} onSelectModule={onSelectModule} />
        )}
      </div>
    </div>
  );
};
