
import React from 'react';
import type { Category, Question } from '../types';
import JeopardyCell from './JeopardyCell';

interface JeopardyBoardProps {
  board: Category[];
  onSelectQuestion: (question: Question) => void;
}

const JeopardyBoard: React.FC<JeopardyBoardProps> = ({ board, onSelectQuestion }) => {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4">
      {board.map((category) => (
        <div key={category.title} className="flex flex-col gap-2 md:gap-4">
          <div className={`text-center font-bold p-4 rounded-t-lg text-sm md:text-base ${category.color} shadow-md`}>
            {category.title.toUpperCase()}
          </div>
          {category.questions.map((question) => (
            <JeopardyCell
              key={question.id}
              question={question}
              onSelect={onSelectQuestion}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default JeopardyBoard;
