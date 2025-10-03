import type { Category } from '../types';

export const INITIAL_GAME_DATA: Category[] = [
  {
    title: "Generatieve AI",
    color: "bg-blue-800",
    questions: [{
      id: 1, points: 100, completed: false, answeredCorrectly: null,
      cards: [
        { id: "1a", text: "generatieve AI is software die" },
        { id: "1b", text: "nieuwe content creëert zoals tekst, beeld of geluid" },
        { id: "1c", text: "gebaseerd op patronen die het geleerd heeft" },
        { id: "1d", text: "uit grote hoeveelheden trainingsdata" }
      ],
      correctSentence: "Generatieve AI is software die nieuwe content creëert zoals tekst, beeld of geluid gebaseerd op patronen die het geleerd heeft uit grote hoeveelheden trainingsdata"
    }]
  },
  {
    title: "Prompts",
    color: "bg-green-800",
    questions: [{
      id: 2, points: 200, completed: false, answeredCorrectly: null,
      cards: [
        { id: "2a", text: "een prompt is de instructie" },
        { id: "2b", text: "die je aan AI geeft" },
        { id: "2c", text: "om te sturen wat voor output je wilt" },
        { id: "2d", text: "waarbij specificiteit betere resultaten geeft" }
      ],
      correctSentence: "Een prompt is de instructie die je aan AI geeft om te sturen wat voor output je wilt waarbij specificiteit betere resultaten geeft"
    }]
  },
  {
    title: "AI Hallucinatie",
    color: "bg-orange-800",
    questions: [{
      id: 3, points: 300, completed: false, answeredCorrectly: null,
      cards: [
        { id: "3a", text: "AI 'hallucineert' wanneer het" },
        { id: "3b", text: "informatie verzint die plausibel klinkt" },
        { id: "3c", text: "maar feitelijk onjuist is" },
        { id: "3d", text: "omdat het patronen invult zonder echte kennis" }
      ],
      correctSentence: "AI 'hallucineert' wanneer het informatie verzint die plausibel klinkt maar feitelijk onjuist is omdat het patronen invult zonder echte kennis"
    }]
  },
  {
    title: "DROP Methode",
    color: "bg-purple-800",
    questions: [{
      id: 4, points: 400, completed: false, answeredCorrectly: null,
      cards: [
        { id: "4a", text: "DROP staat voor Doel, Rol, Opmaak, Publiek en helpt" },
        { id: "4b", text: "om complete context aan AI te geven" },
        { id: "4c", text: "zodat de output beter aansluit" },
        { id: "4d", text: "bij wat je precies nodig hebt" }
      ],
      correctSentence: "DROP staat voor Doel, Rol, Opmaak, Publiek en helpt om complete context aan AI te geven zodat de output beter aansluit bij wat je precies nodig hebt"
    }]
  },
  {
    title: "Context Window",
    color: "bg-pink-800",
    questions: [{
      id: 5, points: 500, completed: false, answeredCorrectly: null,
      cards: [
        { id: "5a", text: "het context window is de hoeveelheid tekst" },
        { id: "5b", text: "die AI tegelijk kan 'onthouden'" },
        { id: "5c", text: "tijdens een gesprek" },
        { id: "5d", text: "en bepaalt hoeveel informatie je kunt meegeven" }
      ],
      correctSentence: "Het context window is de hoeveelheid tekst die AI tegelijk kan 'onthouden' tijdens een gesprek en bepaalt hoeveel informatie je kunt meegeven"
    }]
  },
  {
    title: "Temperature",
    color: "bg-yellow-800",
    questions: [{
      id: 6, points: 600, completed: false, answeredCorrectly: null,
      cards: [
        { id: "6a", text: "temperature is een instelling die bepaalt" },
        { id: "6b", text: "hoe creatief of voorspelbaar" },
        { id: "6c", text: "de AI-output is" },
        { id: "6d", text: "waarbij hoger meer variatie geeft" }
      ],
      correctSentence: "Temperature is een instelling die bepaalt hoe creatief of voorspelbaar de AI-output is waarbij hoger meer variatie geeft"
    }]
  },
  {
    title: "Tokens",
    color: "bg-teal-800",
    questions: [{
      id: 7, points: 700, completed: false, answeredCorrectly: null,
      cards: [
        { id: "7a", text: "tokens zijn de bouwblokken" },
        { id: "7b", text: "waarin AI tekst opdeelt" },
        { id: "7c", text: "ongeveer 3/4 van een woord" },
        { id: "7d", text: "en bepalen de kosten en limiet van een gesprek" }
      ],
      correctSentence: "Tokens zijn de bouwblokken waarin AI tekst opdeelt ongeveer 3/4 van een woord en bepalen de kosten en limiet van een gesprek"
    }]
  },
  {
    title: "AI Bias",
    color: "bg-red-800",
    questions: [{
      id: 8, points: 800, completed: false, answeredCorrectly: null,
      cards: [
        { id: "8a", text: "AI bias ontstaat wanneer" },
        { id: "8b", text: "vooroordelen in trainingsdata" },
        { id: "8c", text: "leiden tot oneerlijke output" },
        { id: "8d", text: "die bepaalde groepen benadeelt" }
      ],
      correctSentence: "AI bias ontstaat wanneer vooroordelen in trainingsdata leiden tot oneerlijke output die bepaalde groepen benadeelt"
    }]
  },
  {
    title: "Fine-Tuning",
    color: "bg-lime-800",
    questions: [{
      id: 9, points: 900, completed: false, answeredCorrectly: null,
      cards: [
        { id: "9a", text: "fine-tuning is het proces waarbij" },
        { id: "9b", text: "een AI-model wordt aangepast" },
        { id: "9c", text: "voor specifieke taken of stijlen" },
        { id: "9d", text: "door extra training op specialistische data" }
      ],
      correctSentence: "Fine-tuning is het proces waarbij een AI-model wordt aangepast voor specifieke taken of stijlen door extra training op specialistische data"
    }]
  },
];