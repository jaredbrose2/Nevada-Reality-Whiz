
import React from 'react';
import { Module } from '../types';

interface ModuleSelectorProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
}

const ModuleCard: React.FC<{ module: Module, onClick: () => void }> = ({ module, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-left w-full h-full flex flex-col justify-between transform hover:-translate-y-1 animate-slide-in-bottom"
  >
    <div>
      <div className="mb-4">
        {module.icon}
      </div>
      <h3 className="text-xl font-semibold text-brand-blue-dark mb-2">{module.title}</h3>
      <p className="text-gray-600">{module.description}</p>
    </div>
  </button>
);


export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ modules, onSelectModule }) => {
  return (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Choose a topic to master</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
                <ModuleCard key={module.id} module={module} onClick={() => onSelectModule(module)} />
            ))}
        </div>
    </div>
  );
};
