import React, { useState, useEffect } from 'react';
import type { Question, Card } from '../types';

interface QuestionModalProps {
  question: Question;
  onClose: (correct: boolean, points: number) => void;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const normalizeSentence = (sentence: string): string => {
  return sentence.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").replace(/\s+/g, ' ').trim();
};

const QuestionModal: React.FC<QuestionModalProps> = ({ question, onClose }) => {
  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [answerCards, setAnswerCards] = useState<Card[]>([]);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    setAvailableCards(shuffleArray(question.cards));
    setAnswerCards([]);
    setResult(null);
  }, [question]);

  const selectCard = (card: Card) => {
    if (result) return;
    setAvailableCards(prev => prev.filter(c => c.id !== card.id));
    setAnswerCards(prev => [...prev, card]);
  };

  const deselectCard = (card: Card) => {
    if (result) return;
    setAnswerCards(prev => prev.filter(c => c.id !== card.id));
    setAvailableCards(prev => [...prev, card]);
  };

  const checkManualAnswer = () => {
    const userAnswer = answerCards.map(c => c.text).join(' ');
    const isCorrect = normalizeSentence(userAnswer) === normalizeSentence(question.correctSentence);
    setResult(isCorrect ? 'correct' : 'incorrect');
    setTimeout(() => onClose(isCorrect, question.points), 2500);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-4 border-blue-500 rounded-lg shadow-2xl w-full max-w-4xl p-6 relative transform transition-all animate-scale-in">
        
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-yellow-300">{question.points} Punten</h2>
            <button onClick={() => onClose(false, 0)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        {result && (
          <div className={`p-4 rounded-lg text-center mb-4 text-white ${result === 'correct' ? 'bg-green-600' : 'bg-red-600'}`}>
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                <i className={`fa-solid ${result === 'correct' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                {result === 'correct' ? 'Correct!' : 'Incorrect!'}
            </h3>
          </div>
        )}
        
        <p className="mb-4 text-lg">Plaats de kaarten in de juiste volgorde om de definitie te vormen.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 border-b-2 border-gray-600 pb-1">Beschikbare Kaarten</h3>
            <div className={`bg-gray-900 p-3 rounded-lg min-h-[200px] flex flex-col gap-2 ${result ? 'opacity-50' : ''}`}>
              {availableCards.map(card => (
                <div key={card.id} onClick={() => selectCard(card)} className="bg-blue-700 p-3 rounded-md cursor-pointer hover:bg-blue-600 transition-colors">
                  {card.text}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 border-b-2 border-gray-600 pb-1">Jouw Antwoord</h3>
            <div className="bg-gray-900 p-3 rounded-lg min-h-[200px] flex flex-col gap-2">
              {answerCards.map(card => (
                <div key={card.id} onClick={() => deselectCard(card)} 
                  className={`p-3 rounded-md transition-all duration-300 ${
                    result === 'correct' 
                      ? 'bg-yellow-400 text-black font-bold ring-4 ring-yellow-200 shadow-lg' 
                      : 'bg-green-700'
                  } ${!result ? 'cursor-pointer hover:bg-green-600' : ''}`}
                >
                  {card.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center">
            <button
                onClick={checkManualAnswer}
                disabled={answerCards.length !== question.cards.length || !!result}
                className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
                Antwoord Bevestigen
            </button>
        </div>

      </div>
    </div>
  );
};

export default QuestionModal;