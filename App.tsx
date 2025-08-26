
import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LearningDashboard } from './components/LearningDashboard';
import { AppState, Module } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);

  const handleStartLearning = useCallback(() => {
    setAppState(AppState.DASHBOARD);
  }, []);

  const handleSelectModule = useCallback((module: Module) => {
    setCurrentModule(module);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setCurrentModule(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.WELCOME:
        return <WelcomeScreen onStart={handleStartLearning} />;
      case AppState.DASHBOARD:
        return <LearningDashboard 
                 selectedModule={currentModule} 
                 onSelectModule={handleSelectModule}
                 onBack={handleBackToDashboard} 
               />;
      default:
        return <WelcomeScreen onStart={handleStartLearning} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
