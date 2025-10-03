
import React from 'react';
import type { Question } from '../types';

interface JeopardyCellProps {
  question: Question;
  onSelect: (question: Question) => void;
}

const JeopardyCell: React.FC<JeopardyCellProps> = ({ question, onSelect }) => {
  const handleClick = () => {
    if (!question.completed) {
      onSelect(question);
    }
  };

  if (question.completed) {
    if (question.answeredCorrectly) {
      return (
        <div className="h-24 md:h-32 flex items-center justify-center bg-green-900/60 rounded-lg text-green-300 border-2 border-green-500 animate-pulse-once">
          <i className="fa-solid fa-check text-5xl"></i>
        </div>
      );
    } else {
      return (
        <div className="h-24 md:h-32 flex items-center justify-center bg-red-900/60 rounded-lg text-red-300 border-2 border-red-500">
          <i className="fa-solid fa-times text-5xl"></i>
        </div>
      );
    }
  }

  return (
    <div
      className="h-24 md:h-32 flex items-center justify-center bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
      onClick={handleClick}
    >
      <span className="text-3xl md:text-5xl font-bold text-yellow-300" style={{ textShadow: '3px 3px 6px #000000' }}>
        {question.points}
      </span>
    </div>
  );
};

export default JeopardyCell;