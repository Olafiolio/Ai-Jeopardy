
import React from 'react';

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-4 border-yellow-400 rounded-lg shadow-2xl w-full max-w-2xl p-6 relative animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
        <h2 className="text-3xl font-bold text-yellow-300 mb-4 text-center">Spelinstructies</h2>
        <div className="space-y-4 text-gray-200">
          <p>Welkom bij AI Definities Jeopardy! Test je kennis van belangrijke AI-concepten.</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Kies een Categorie:</strong> Klik op een kaart met een puntenwaarde om een vraag te starten.</li>
            <li><strong>Vorm de Definitie:</strong> Je krijgt een set van ongesorteerde kaarten. Jouw taak is om de volledige, correcte definitie te vormen.</li>
            <li>
              <strong>Twee Manieren om te Spelen:</strong>
              <ul className="list-disc list-inside space-y-1 pl-6 mt-1">
                <li><strong>Klikken & Slepen:</strong> Klik op de kaarten in de juiste volgorde om ze naar het 'Jouw Antwoord' vak te verplaatsen.</li>
                <li><strong>Spraakinvoer:</strong> Klik op de microfoonknop (<i className="fa-solid fa-microphone"></i>) en spreek de volledige definitie duidelijk uit. De AI zal beoordelen of je antwoord correct is!</li>
              </ul>
            </li>
            <li><strong>Scoren:</strong> Voor elk correct antwoord verdien je het aantal punten dat op de kaart staat.</li>
            <li><strong>Doel:</strong> Beantwoord alle vragen correct om het spel te winnen en een speciale beloning te ontgrendelen!</li>
          </ul>
          <p className="font-bold text-center">Veel succes!</p>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start het Spel!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
