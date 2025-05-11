
import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';

const Chatbot = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const languages = ["English", "Hindi", "Kannada"];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">FinBuddy Chat Assistant</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ask any financial question and get personalized advice from our AI-powered assistant.
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => setSelectedLanguage(language)}
              className={`px-4 py-2 text-sm font-medium ${
                selectedLanguage === language
                  ? 'bg-finbuddy-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-finbuddy-50'
              } ${
                language === 'English'
                  ? 'rounded-l-lg'
                  : language === 'Kannada'
                  ? 'rounded-r-lg'
                  : ''
              } border border-gray-200`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <ChatInterface selectedLanguage={selectedLanguage} />

      <div className="mt-12 bg-finbuddy-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Tips for using the Chatbot:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Ask specific questions about loans, investments, or savings</li>
          <li>Inquire about financial terms you don't understand</li>
          <li>Get personalized advice based on your financial situation</li>
          <li>Switch languages using the buttons above</li>
          <li>Use voice input by clicking the microphone button</li>
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;
