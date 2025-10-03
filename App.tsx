
import React, { useState, useEffect, useCallback } from 'react';
import { GameState } from './types';
import type { Question } from './types';
import { INITIAL_GAME_DATA } from './data/gameData';
import Header from './components/Header';
import JeopardyBoard from './components/JeopardyBoard';
import QuestionModal from './components/QuestionModal';
import EndScreen from './components/VictoryScreen';
import InstructionsModal from './components/InstructionsModal';

const createInitialState = (): GameState => {
  const boardWithState = INITIAL_GAME_DATA.map(category => ({
    ...category,
    questions: category.questions.map(q => ({
      ...q,
      completed: false,
      answeredCorrectly: null,
    })),
  }));
  return {
    board: boardWithState,
    score: 0,
    questionsAnswered: 0,
  };
};

export default function App(): React.ReactElement {
  const [gameState, setGameState] = useState<GameState>(createInitialState);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  const totalQuestions = gameState.board.reduce((acc, category) => acc + category.questions.length, 0);
  const isGameFinished = totalQuestions > 0 && gameState.questionsAnswered === totalQuestions;

  const handleSelectQuestion = useCallback((question: Question) => {
    if (!question.completed) {
      setActiveQuestion(question);
    }
  }, []);

  const handleCloseQuestion = useCallback((correct: boolean, points: number) => {
    setGameState(prevState => {
      const newScore = correct ? prevState.score + points : prevState.score;
      const newBoard = prevState.board.map(cat => ({
        ...cat,
        questions: cat.questions.map(q => 
          q.id === activeQuestion?.id ? { ...q, completed: true, answeredCorrectly: correct } : q
        ),
      }));

      return {
        ...prevState,
        board: newBoard,
        score: newScore,
        questionsAnswered: prevState.questionsAnswered + 1,
      };
    });
    setActiveQuestion(null);
  }, [activeQuestion]);

  const restartGame = () => {
    setGameState(createInitialState());
    setActiveQuestion(null);
    setShowInstructions(true);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col items-center p-4">
      <div className="w-full max-w-7xl">
        <Header score={gameState.score} onRestart={restartGame} onShowInstructions={() => setShowInstructions(true)} />
        {isGameFinished ? (
          <EndScreen board={gameState.board} score={gameState.score} onRestart={restartGame} />
        ) : (
          <main className="mt-8">
            <JeopardyBoard board={gameState.board} onSelectQuestion={handleSelectQuestion} />
          </main>
        )}
      </div>

      {activeQuestion && (
        <QuestionModal
          question={activeQuestion}
          onClose={handleCloseQuestion}
        />
      )}
      
      {showInstructions && totalQuestions > 0 && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}
