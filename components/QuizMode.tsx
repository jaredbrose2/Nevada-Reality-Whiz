
import React, { useState, useMemo } from 'react';
import { Quiz, QuizQuestion } from '../types';

interface QuizModeProps {
  quiz: Quiz;
  onFinish: () => void;
}

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const XCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


export const QuizMode: React.FC<QuizModeProps> = ({ quiz, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(quiz.questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleSelectAnswer = (option: string) => {
    if (selectedAnswers[currentQuestionIndex] !== null) return; // Prevent changing answer
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const score = useMemo(() => {
    return selectedAnswers.reduce((total, answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);
  }, [selectedAnswers, quiz.questions]);

  if (showResults) {
    const percentage = (score / quiz.questions.length) * 100;
    return (
      <div className="text-center p-6 animate-fade-in">
        <h3 className="text-3xl font-bold text-brand-blue-dark mb-4">Quiz Complete!</h3>
        <p className="text-xl text-gray-700 mb-2">You scored:</p>
        <p className={`text-6xl font-extrabold mb-6 ${percentage >= 75 ? 'text-green-500' : 'text-brand-gold-dark'}`}>
          {score} / {quiz.questions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div className={`h-4 rounded-full ${percentage >= 75 ? 'bg-green-500' : 'bg-brand-gold'}`} style={{ width: `${percentage}%` }}></div>
        </div>
        <button onClick={onFinish} className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-8 rounded-lg text-lg">
          Finish Review
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <div className="mb-4 text-sm text-gray-500">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </div>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">{currentQuestion.question}</h3>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswers[currentQuestionIndex] === option;
          const isCorrect = currentQuestion.correctAnswer === option;
          const isAnswered = selectedAnswers[currentQuestionIndex] !== null;

          let buttonClass = 'border-gray-300 hover:bg-gray-100';
          if (isAnswered) {
            if (isCorrect) {
              buttonClass = 'bg-green-100 border-green-500 text-green-800';
            } else if (isSelected) {
              buttonClass = 'bg-red-100 border-red-500 text-red-800';
            } else {
                buttonClass = 'border-gray-300';
            }
          } else if(isSelected) {
            buttonClass = 'bg-blue-100 border-brand-blue';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option)}
              disabled={isAnswered}
              className={`w-full text-left p-4 border rounded-lg transition-colors duration-200 flex justify-between items-center ${buttonClass}`}
            >
              <span>{option}</span>
              {isAnswered && isCorrect && <CheckCircleIcon className="w-6 h-6 text-green-600"/>}
              {isAnswered && !isCorrect && isSelected && <XCircleIcon className="w-6 h-6 text-red-600"/>}
            </button>
          );
        })}
      </div>

      {selectedAnswers[currentQuestionIndex] !== null && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-brand-blue-light rounded-r-lg animate-fade-in">
          <p className="font-bold text-brand-blue-dark">Explanation:</p>
          <p className="text-gray-700 mt-1">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="mt-8 text-right">
        <button 
          onClick={handleNext} 
          disabled={selectedAnswers[currentQuestionIndex] === null}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2 px-8 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'See Results'}
        </button>
      </div>
    </div>
  );
};
