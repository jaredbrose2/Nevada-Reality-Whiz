
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const AcademicCapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
);


export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-brand-blue to-brand-blue-dark p-6 text-white animate-fade-in">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center items-center mb-6">
          <AcademicCapIcon className="w-20 h-20 text-brand-gold-light" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Welcome to Nevada Realty Whiz
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto">
          Your personal AI tutor for acing the Nevada real estate exam. Let's turn study time into a success story.
        </p>
        <button
          onClick={onStart}
          className="bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-bold py-4 px-10 rounded-full text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Start Learning
        </button>
      </div>
      <footer className="absolute bottom-4 text-sm text-blue-200">
        Powered by Gemini AI
      </footer>
    </div>
  );
};
