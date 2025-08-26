
import React, { useState } from 'react';
import { Module, Quiz } from '../types';
import { ChatWindow } from './ChatWindow';
import { QuizMode } from './QuizMode';
import { geminiService } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';

interface LearningInterfaceProps {
  module: Module;
  onBack: () => void;
}

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const DocumentTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

const ChatBubbleLeftRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 0 1-1.59 0l-3.72-3.72a2.369 2.369 0 0 1-1.98-2.193v-4.286c0-.97.616-1.813 1.5-2.097m6.75 0a48.667 48.667 0 0 0-7.5 0m7.5 0v-1.344c0-1.682-1.343-3.026-3-3.026h-1.5c-1.657 0-3 1.344-3 3.026v1.344m7.5 0a48.667 48.667 0 0 0-7.5 0M3.75 5.25h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25Z" />
    </svg>
);


export const LearningInterface: React.FC<LearningInterfaceProps> = ({ module, onBack }) => {
  const [isQuizzing, setIsQuizzing] = useState(false);
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  const handleStartQuiz = async () => {
    setIsLoadingQuiz(true);
    setQuizData(null);
    const data = await geminiService.generateQuiz(module.title);
    setQuizData(data);
    setIsLoadingQuiz(false);
    if(data) {
        setIsQuizzing(true);
    } else {
        alert("Sorry, there was an error creating your quiz. Please try again.");
    }
  };

  const handleFinishQuiz = () => {
    setIsQuizzing(false);
    setQuizData(null);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 border-b border-gray-200 pb-6">
        <div className="flex items-center">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 mr-4">
                <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center">
                <div className="bg-brand-blue/10 p-3 rounded-lg mr-4">{module.icon}</div>
                <div>
                    <h2 className="text-2xl font-bold text-brand-blue-dark">{module.title}</h2>
                    <p className="text-gray-500">Engage with your AI tutor or start a quiz.</p>
                </div>
            </div>
        </div>
        <div className="mt-4 sm:mt-0 flex-shrink-0">
          {!isQuizzing ? (
            <button onClick={handleStartQuiz} disabled={isLoadingQuiz} className="flex items-center justify-center bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto">
              {isLoadingQuiz ? (
                  <>
                      <LoadingSpinner /> Generating Quiz...
                  </>
               ) : (
                <>
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  Test My Knowledge
                </>
              )}
            </button>
          ) : (
             <button onClick={handleFinishQuiz} className="flex items-center bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors duration-200 w-full sm:w-auto">
                 <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                Back to Tutor
             </button>
          )}
        </div>
      </div>
      
      <div>
        {isQuizzing && quizData ? (
          <QuizMode quiz={quizData} onFinish={handleFinishQuiz} />
        ) : (
          <ChatWindow module={module} />
        )}
      </div>
    </div>
  );
};
