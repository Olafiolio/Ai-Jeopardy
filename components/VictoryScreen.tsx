
import React from 'react';
import type { Category } from '../types';

interface EndScreenProps {
  board: Category[];
  score: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ board, score, onRestart }) => {
  const allQuestions = board.flatMap(category => 
    category.questions.map(question => ({
      ...question,
      categoryTitle: category.title,
    }))
  );

  const correctAnswers = allQuestions.filter(q => q.answeredCorrectly);
  const incorrectAnswers = allQuestions.filter(q => !q.answeredCorrectly);

  const getPerformanceMessage = () => {
    const percentage = allQuestions.length > 0 ? (correctAnswers.length / allQuestions.length) * 100 : 0;
    if (percentage === 100) {
      return "Perfecte score! Je bent een ware AI-expert!";
    }
    if (percentage >= 75) {
      return "Uitstekend werk! Je hebt een diepgaand begrip van AI.";
    }
    if (percentage >= 50) {
      return "Goed gedaan! Je bent goed op weg om een expert te worden.";
    }
    return "Goed geprobeerd! Blijf leren en probeer het opnieuw.";
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800 rounded-lg shadow-xl animate-fade-in mt-8">
      <h1 className="text-5xl font-bold text-yellow-300 mb-4">Spelrapport</h1>
      <p className="text-2xl text-cyan-300 mb-2">Eindscore: <span className="font-bold text-green-400">{score}</span></p>
      <p className="text-xl text-gray-300 mb-8">{getPerformanceMessage()}</p>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-green-400 mb-4 border-b-2 border-green-500 pb-2">
            <i className="fa-solid fa-check-circle mr-2"></i>
            Correcte Antwoorden ({correctAnswers.length})
          </h2>
          <ul className="space-y-2 text-left">
            {correctAnswers.map(q => (
              <li key={q.id} className="bg-gray-800 p-3 rounded-md flex justify-between items-center">
                <span className="text-gray-200">{q.categoryTitle}</span>
                <span className="font-bold text-yellow-300">{q.points} ptn.</span>
              </li>
            ))}
             {correctAnswers.length === 0 && <p className="text-gray-400 text-center italic mt-4">Geen correcte antwoorden deze ronde.</p>}
          </ul>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-4 border-b-2 border-red-500 pb-2">
            <i className="fa-solid fa-times-circle mr-2"></i>
            Verbeterpunten ({incorrectAnswers.length})
          </h2>
          <ul className="space-y-2 text-left">
            {incorrectAnswers.map(q => (
              <li key={q.id} className="bg-gray-800 p-3 rounded-md flex justify-between items-center">
                <span className="text-gray-200">{q.categoryTitle}</span>
                <span className="font-bold text-yellow-300">{q.points} ptn.</span>
              </li>
            ))}
            {incorrectAnswers.length === 0 && <p className="text-gray-400 text-center italic mt-4">Geen foute antwoorden! Perfect!</p>}
          </ul>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mt-12 px-8 py-4 bg-blue-600 text-white font-bold text-xl rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Speel Opnieuw
      </button>
    </div>
  );
};

export default EndScreen;