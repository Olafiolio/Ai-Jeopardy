
import React from 'react';

interface HeaderProps {
  score: number;
  onRestart: () => void;
  onShowInstructions: () => void;
}

const Header: React.FC<HeaderProps> = ({ score, onRestart, onShowInstructions }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-lg border-b-4 border-blue-500">
      <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-yellow-300" style={{ textShadow: '2px 2px 4px #000000' }}>
        AI Definities Jeopardy
      </h1>
      <div className="flex items-center space-x-4">
        <div className="text-xl md:text-2xl font-bold bg-blue-900 px-4 py-2 rounded-md border-2 border-blue-400">
          SCORE: <span className="text-green-400">{score}</span>
        </div>
        <button onClick={onShowInstructions} className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-gray-900 transition-transform duration-200 hover:scale-110" title="Instructies">
          <i className="fa-solid fa-question"></i>
        </button>
        <button onClick={onRestart} className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-transform duration-200 hover:scale-110" title="Herstart Spel">
          <i className="fa-solid fa-refresh"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
