// Een enkele AudioContext instantie om te voorkomen dat er te veel worden aangemaakt.
// Deze moet worden geïnitialiseerd na een gebruikersinteractie om te voldoen aan het autoplay-beleid van browsers.
let audioContext: AudioContext | null = null;

const initializeAudioContext = () => {
  if (!audioContext) {
    // De 'any' cast is voor cross-browser compatibiliteit met webkitAudioContext.
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
};

type SoundType = 'select' | 'correct' | 'incorrect' | 'tick' | 'buzz';

export const playSound = (type: SoundType) => {
  // Initialiseer bij de eerste gebruikersinteractie (eerste keer dat een geluid wordt afgespeeld)
  initializeAudioContext();
  if (!audioContext) return;

  // Voorkom problemen met de audio state op sommige browsers (bv. Safari)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  let volume = 0.2;
  let duration = 0.5;

  switch (type) {
    case 'select':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      duration = 0.3;
      break;
    case 'correct':
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); 
      oscillator.frequency.linearRampToValueAtTime(783.99, audioContext.currentTime + 0.2); 
      duration = 0.4;
      break;
    case 'incorrect':
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      duration = 0.5;
      break;
    case 'tick':
      volume = 0.08;
      duration = 0.1;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      break;
    case 'buzz':
      volume = 0.25;
      duration = 0.7;
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
      break;
  }

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};