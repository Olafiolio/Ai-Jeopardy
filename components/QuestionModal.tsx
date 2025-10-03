import React, { useState, useEffect, useCallback } from 'react';
import type { Question, Card } from '../types';
import { getDeeperExplanation } from '../services/geminiService';
import { playSound } from '../services/soundService';

interface QuestionModalProps {
  question: Question;
  onClose: (correct: boolean, points: number) => void;
}

const TIME_LIMIT = 30;

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
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);

  const handleIncorrectSubmit = useCallback(async () => {
    setResult('incorrect');
    setIsExplanationLoading(true);
    try {
      const categoryTitle = document.querySelector(`div[data-question-id='${question.id}']`)?.closest('.flex-col')?.querySelector('.font-bold')?.textContent || "dit AI concept";
      const deepDive = await getDeeperExplanation(categoryTitle);
      setExplanation(deepDive);
    } catch (e) {
      setExplanation("Kon op dit moment geen uitleg ophalen.");
    } finally {
      setIsExplanationLoading(false);
    }
  }, [question.id]);

  useEffect(() => {
    setAvailableCards(shuffleArray(question.cards));
    setAnswerCards([]);
    setResult(null);
    setExplanation(null);
    setIsExplanationLoading(false);
    setTimeLeft(TIME_LIMIT);
  }, [question]);

  useEffect(() => {
    if (result) return;

    if (timeLeft === 0) {
      playSound('buzz');
      handleIncorrectSubmit();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      playSound('tick');
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, result, handleIncorrectSubmit]);

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

  const checkAnswer = async () => {
    const userAnswer = answerCards.map(c => c.text).join(' ');
    const isCorrect = normalizeSentence(userAnswer) === normalizeSentence(question.correctSentence);
    
    playSound(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setResult('correct');
      // Fetch explanation even on correct answer for consistency in the "Leer Meer" feature
      setIsExplanationLoading(true);
      try {
        const categoryTitle = document.querySelector(`div[data-question-id='${question.id}']`)?.closest('.flex-col')?.querySelector('.font-bold')?.textContent || "dit AI concept";
        const deepDive = await getDeeperExplanation(categoryTitle);
        setExplanation(deepDive);
      } catch (e) {
        setExplanation("Kon op dit moment geen uitleg ophalen.");
      } finally {
        setIsExplanationLoading(false);
      }
    } else {
      await handleIncorrectSubmit();
    }
  };

  const progress = (timeLeft / TIME_LIMIT) * 100;
  const getTimerColor = () => {
    if (progress > 50) return 'bg-green-500';
    if (progress > 25) return 'bg-yellow-500';
    return 'bg-red-600';
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-4 border-blue-500 rounded-lg shadow-2xl w-full max-w-4xl p-6 relative transform transition-all animate-scale-in">
        
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 absolute top-0 left-0">
          <div
              className={`h-2.5 rounded-full ${getTimerColor()} transition-all duration-1000 ease-linear`}
              style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-start mb-4 pt-2">
            <h2 className="text-2xl font-bold text-yellow-300">{question.points} Punten</h2>
            <div className="flex items-center gap-4">
                <span className={`text-2xl font-mono font-bold ${timeLeft <= 5 ? 'text-red-500 animate-ping' : ''}`}>{timeLeft}</span>
                {!result && <button onClick={() => onClose(false, 0)} className="text-gray-400 hover:text-white text-2xl">&times;</button>}
            </div>
        </div>

        {result && (
          <div className={`p-4 rounded-lg text-center mb-4 text-white ${result === 'correct' ? 'bg-green-600' : 'bg-red-600'}`}>
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                <i className={`fa-solid ${result === 'correct' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                {result === 'correct' ? 'Correct!' : 'Incorrect!'}
            </h3>
            {result === 'incorrect' && <p className="text-sm mt-2 font-light">De juiste zin is: "{question.correctSentence}"</p>}
          </div>
        )}
        
        {!result && <p className="mb-4 text-lg">Plaats de kaarten in de juiste volgorde om de definitie te vormen.</p>}

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${result ? 'opacity-60 pointer-events-none' : ''}`}>
          <div>
            <h3 className="font-semibold mb-2 border-b-2 border-gray-600 pb-1">Beschikbare Kaarten</h3>
            <div className="bg-gray-900 p-3 rounded-lg min-h-[200px] flex flex-col gap-2">
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
                <div key={card.id} onClick={() => deselectCard(card)} className="bg-green-700 p-3 rounded-md cursor-pointer hover:bg-green-600">
                  {card.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {result && (
          <div className="mt-4 p-4 bg-gray-900/50 border-2 border-purple-400 rounded-lg">
            <h3 className="font-bold text-xl text-purple-300 mb-2">Leer Meer</h3>
            {isExplanationLoading ? (
              <p className="italic text-gray-400">Uitleg wordt geladen...</p>
            ) : (
              <p className="text-gray-200">{explanation}</p>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-center">
            {!result ? (
              <button
                  onClick={checkAnswer}
                  disabled={answerCards.length !== question.cards.length || !!result}
                  className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                  Antwoord Bevestigen
              </button>
            ) : (
               <button
                  onClick={() => onClose(result === 'correct', question.points)}
                  disabled={isExplanationLoading}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
               >
                  {isExplanationLoading ? 'Laden...' : 'Volgende Vraag'}
               </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default QuestionModal;