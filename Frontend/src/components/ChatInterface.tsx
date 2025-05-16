
import { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello! I'm your FinBuddy assistant. How can I help you with your finances today?`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dummy responses based on selected language
  const dummyResponses: Record<string, string[]> = {
    English: [
      "To improve your credit score, make sure to pay all your bills on time and keep your credit utilization below 30%.",
      "Based on standard calculations, with this loan amount and interest rate, your EMI would be approximately ₹15,000 per month.",
      "A mutual fund is a type of investment vehicle that pools money from many investors to purchase securities.",
      "SIPs or Systematic Investment Plans allow you to invest a fixed amount regularly in mutual funds, helping you build wealth over time.",
      "For first-time home buyers, I recommend checking government schemes like PMAY that offer subsidies on home loans."
    ],
    Hindi: [
      "अपने क्रेडिट स्कोर को सुधारने के लिए, अपने सभी बिलों का समय पर भुगतान करें और अपने क्रेडिट उपयोग को 30% से कम रखें।",
      "मानक गणनाओं के आधार पर, इस ऋण राशि और ब्याज दर के साथ, आपका ईएमआई लगभग ₹15,000 प्रति माह होगा।",
      "म्यूचुअल फंड एक प्रकार का निवेश वाहन है जो प्रतिभूतियों को खरीदने के लिए कई निवेशकों से पैसा जुटाता है।",
      "SIP या सिस्टेमैटिक इन्वेस्टमेंट प्लान आपको म्यूचुअल फंड में नियमित रूप से एक निश्चित राशि निवेश करने की अनुमति देते हैं, जिससे आपको समय के साथ धन बनाने में मदद मिलती है।",
      "पहली बार घर खरीदने वालों के लिए, मैं PMAY जैसी सरकारी योजनाओं की जांच करने की सलाह देता हूं जो होम लोन पर सब्सिडी प्रदान करते हैं।"
    ],
    Kannada: [
      "ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಿಸಲು, ನಿಮ್ಮ ಎಲ್ಲಾ ಬಿಲ್‌ಗಳನ್ನು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಪಾವತಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಬಳಕೆಯನ್ನು 30% ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಿಸಿ.",
      "ಪ್ರಮಾಣಿತ ಲೆಕ್ಕಾಚಾರಗಳ ಪ್ರಕಾರ, ಈ ಸಾಲದ ಮೊತ್ತ ಮತ್ತು ಬಡ್ಡಿ ದರದೊಂದಿಗೆ, ನಿಮ್ಮ EMI ಸುಮಾರು ₹15,000 ಪ್ರತಿ ತಿಂಗಳು ಆಗಿರುತ್ತದೆ.",
      "ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ ಎನ್ನುವುದು ಸೆಕ್ಯುರಿಟೀಸ್ ಖರೀದಿಸಲು ಅನೇಕ ಹೂಡಿಕೆದಾರರಿಂದ ಹಣವನ್ನು ಪೂಲ್ ಮಾಡುವ ಒಂದು ರೀತಿಯ ಇನ್ವೆಸ್ಟ್‌ಮೆಂಟ್ ವಾಹನ.",
      "SIPs ಅಥವಾ ಸಿಸ್ಟಮ್ಯಾಟಿಕ್ ಇನ್ವೆಸ್ಟ್‌ಮೆಂಟ್ ಪ್ಲಾನ್‌ಗಳು ನಿಮಗೆ ಮ್ಯೂಚುಯಲ್ ಫಂಡ್‌ಗಳಲ್ಲಿ ನಿಯಮಿತವಾಗಿ ನಿಗದಿತ ಮೊತ್ತವನ್ನು ಹೂಡಿಕೆ ಮಾಡಲು ಅನುಮತಿಸುತ್ತವೆ, ಇದು ನಿಮಗೆ ಕಾಲಾನಂತರದಲ್ಲಿ ಸಂಪತ್ತು ಸೃಷ್ಟಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      "ಮೊದಲ ಬಾರಿಗೆ ಮನೆ ಖರೀದಿದಾರರಿಗೆ, ನಾನು ಗೃಹ ಸಾಲಗಳ ಮೇಲೆ ಸಬ್ಸಿಡಿಗಳನ್ನು ನೀಡುವ PMAY ನಂತಹ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಲಹೆ ನೀಡುತ್ತೇನೆ."
    ],
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add this effect to respond to language change
  useEffect(() => {
    // Add a bot message when language changes
    if (messages.length > 0) {
      const languageWelcome = {
        English: "I've switched to English. How can I help you?",
        Hindi: "मैंने हिंदी में स्विच कर दिया है। मैं आपकी कैसे मदद कर सकता हूँ?",
        Kannada: "ನಾನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿದ್ದೇನೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
      };

      setMessages(prevMessages => [
        ...prevMessages, 
        {
          id: Date.now(),
          text: languageWelcome[selectedLanguage as keyof typeof languageWelcome],
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [selectedLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = dummyResponses[selectedLanguage][
        Math.floor(Math.random() * dummyResponses[selectedLanguage].length)
      ];
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
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
            className={`mb-4 flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs sm:max-w-sm break-words ${
                message.sender === 'user'
                  ? 'bg-finbuddy-600 text-white'
                  : 'bg-white border border-finbuddy-100'
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div className="text-xs text-right mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-finbuddy-100 flex">
        <button
          className={`mr-2 p-2 rounded-full ${
            isListening ? 'bg-red-500 text-white' : 'bg-finbuddy-100 text-finbuddy-600'
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
