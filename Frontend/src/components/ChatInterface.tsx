import { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';
import { fetchGroqResponse } from '../lib/groqApi.ts';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedLanguage: string;
}

const ChatInterface = ({ selectedLanguage }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: `Hello! I'm your FinBuddy assistant. How can I help you with your finances today?`,
    sender: 'bot',
    timestamp: new Date(),
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat history and show welcome message when language changes
  useEffect(() => {
    const languageWelcome = {
      English: "Hello! I'm your FinBuddy assistant. How can I help you with your finances today?",
      Hindi: "नमस्ते! मैं आपका FinBuddy सहायक हूँ। मैं आज आपकी वित्तीय मदद कैसे कर सकता हूँ?",
      Kannada: "ಹಲೋ! ನಾನು ನಿಮ್ಮ FinBuddy ಸಹಾಯಕನು. ನಾನು ನಿಮ್ಮ ಹಣಕಾಸಿನ ವಿಷಯಗಳಲ್ಲಿ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
    };
    setMessages([
      {
        id: Date.now(),
        text: languageWelcome[selectedLanguage as keyof typeof languageWelcome] || languageWelcome.English,
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  }, [selectedLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botReply = await fetchGroqResponse(userMessage.text, selectedLanguage);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 2,
          text: "Sorry, there was an error connecting to the assistant.",
          sender: 'bot',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);

    // Simulate speech recognition
    if (!isListening) {
      setTimeout(() => {
        setInputValue('How can I improve my credit score?');
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-finbuddy-100">
      <div className="bg-finbuddy-600 text-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
          <span>FinBuddy Assistant - {selectedLanguage}</span>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 bg-finbuddy-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs sm:max-w-sm break-words ${message.sender === 'user'
                ? 'bg-finbuddy-600 text-white'
                : 'bg-white border border-finbuddy-100'
                }`}
            >
              {message.sender === 'bot' ? (
                <div className="text-sm">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-sm">{message.text}</div>
              )}
              <div className="text-xs text-right mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="rounded-lg px-4 py-2 max-w-xs sm:max-w-sm bg-white border border-finbuddy-100">
              <div className="text-sm">FinBuddy is typing...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-finbuddy-100 flex">
        <button
          className={`mr-2 p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-finbuddy-100 text-finbuddy-600'
            }`}
          onClick={toggleListening}
        >
          <Mic size={20} />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={`Type your message in ${selectedLanguage}...`}
          className="form-input flex-grow"
        />
        <button
          className="ml-2 p-2 bg-finbuddy-600 text-white rounded-full"
          onClick={handleSendMessage}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
