import  { useState, useEffect } from 'react';
import { Heart, Mail, Sparkles } from 'lucide-react';

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const phrases = [
    "No 😢",
    "¿Estás segur@?",
    "¿De verdad?",
    "¡Piénsalo otra vez!",
    "¡Última oportunidad!",
    "¿Segur@ que no? 🥺",
    "¡Me vas a hacer llorar!",
    "¡No me hagas esto! 😭",
    "¡Por favor! 💔",
    "¡Te lo suplico! 🙏"
  ];

  useEffect(() => {
    if (yesPressed) {
      setShowSparkles(true);
      const timer = setTimeout(() => setShowSparkles(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [yesPressed]);

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function getYesButtonSize() {
    return Math.min(noCount * 20 + 16, 48);
  }

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => setShowQuestion(true), 1000);
  };

  const renderSparkles = () => {
    return [...Array(30)].map((_, i) => (
      <div
        key={i}
        className="sparkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 bg-hearts relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2,
              transform: `scale(${Math.random() * 0.8 + 0.5})`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center relative">
        {!isEnvelopeOpen ? (
          <div 
            className="envelope cursor-pointer transform hover:scale-105 transition-transform duration-500"
            onClick={handleEnvelopeClick}
          >
            <div className="text-center mb-12">
              <h1 className="dancing-script text-6xl md:text-7xl text-pink-600 mb-6 heart-border">
                Para Jazmín
              </h1>
              <p className="text-pink-500 text-xl flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />
                Click para abrir
                <Sparkles className="w-6 h-6" />
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl envelope-shadow p-12 transform hover:rotate-2 transition-transform relative float-animation">
              <Mail className="w-32 h-32 text-pink-500 mx-auto" />
              <div className="absolute top-4 left-4">
                <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
              </div>
            </div>
          </div>
        ) : (
          <div className={`letter ${showQuestion ? 'letter-open' : ''} bg-white rounded-xl shadow-2xl p-12 max-w-2xl w-full mx-auto relative`}>
            {showSparkles && renderSparkles()}
            {yesPressed ? (
              <div className="text-center">
                <h1 className="dancing-script text-6xl md:text-7xl text-pink-600 mb-12">¡¡¡SIIIIII!!! 🎉</h1>
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  {[...Array(12)].map((_, i) => (
                    <Heart
                      key={i}
                      className="text-red-500 animate-bounce"
                      size={60}
                      fill="currentColor"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <p className="dancing-script text-4xl text-pink-500 mb-8">¡Te amo muchísimo! ❤️</p>
                <div className="flex justify-center items-center gap-3 text-pink-400">
                  <span className="text-2xl">Sos el amor de mi vida</span>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <img
                    src="/media/fotojaz.jpg"
                    alt="Corazón"
                    className="w-40 h-40 mx-auto mb-8 rounded-full shadow-xl object-cover ring-4 ring-pink-200 hover:ring-pink-300 transition-all duration-300"
                  />
                  <h1 className="dancing-script text-5xl md:text-6xl text-pink-600 mb-6">
                    Mi querida Jazmín...
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Cada día con vos es un regalo, y quiero hacer este día todavia más especial...
                  </p>
                  <p className="text-3xl text-pink-500 mb-12 dancing-script">¿Queres ser mi San Valentín?</p>
                  <div className="flex flex-wrap gap-6 items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl"
                      style={{ fontSize: `${getYesButtonSize()}px` }}
                      onClick={() => setYesPressed(true)}
                    >
                      ¡Sí! 🥰
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl"
                      onClick={() => setNoCount(noCount + 1)}
                      style={{
                        transform: `scale(${Math.max(0.6, 1 - noCount * 0.1)})`,
                      }}
                    >
                      {getNoButtonText()}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;