import { useState } from 'react';
import { MessageSquare, Calculator, BookOpen, ArrowRight } from 'lucide-react';
import QuizQuestion from '../components/QuizQuestion';
import { quizQuestions } from '../data/dummyData';

const FinancialQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(quizQuestions.length).fill(''));
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentageScore = (score / quizQuestions.length) * 100;

  const getBadge = () => {
    if (percentageScore >= 80) {
      return {
        title: "Financial Expert",
        description: "Congratulations! You have excellent financial knowledge.",
        color: "bg-green-100 text-green-800",
      };
    } else if (percentageScore >= 60) {
      return {
        title: "Finance Savvy",
        description: "Good job! You have a solid understanding of financial concepts.",
        color: "bg-blue-100 text-blue-800",
      };
    } else if (percentageScore >= 40) {
      return {
        title: "Financial Learner",
        description: "Not bad! You're on your way to becoming financially literate.",
        color: "bg-yellow-100 text-yellow-800",
      };
    } else {
      return {
        title: "Financial Novice",
        description: "Keep learning! Building financial knowledge takes time.",
        color: "bg-red-100 text-red-800",
      };
    }
  };

  const badge = getBadge();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Financial Literacy Quiz</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test your knowledge about personal finance and improve your financial literacy.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {!showResults ? (
          <div className="p-6">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-finbuddy-600 h-2 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current question */}
            <QuizQuestion
              question={quizQuestions[currentQuestionIndex].question}
              options={quizQuestions[currentQuestionIndex].options}
              selectedAnswer={selectedAnswers[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
            />

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-md ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-secondary'
                }`}
              >
                Previous
              </button>
              
              {!isQuizComplete ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[currentQuestionIndex]}
                  className={`px-4 py-2 rounded-md ${
                    !selectedAnswers[currentQuestionIndex]
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleViewResults}
                  className="btn-primary"
                >
                  View Results
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
              
              <div className="flex justify-center mb-8">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-finbuddy-500" 
                    style={{ 
                      clipPath: `polygon(50% 50%, 50% 0%, ${percentageScore >= 100 ? 50 : 50 + 50 * Math.sin(Math.PI * 2 * percentageScore / 100)}% ${percentageScore >= 100 ? 0 : 50 - 50 * Math.cos(Math.PI * 2 * percentageScore / 100)}%, ${percentageScore >= 75 ? percentageScore >= 100 ? 50 : 50 + 50 * Math.sin(Math.PI * 2 * percentageScore / 100) : 100}% ${percentageScore >= 75 ? percentageScore >= 100 ? 0 : 50 - 50 * Math.cos(Math.PI * 2 * percentageScore / 100) : 50}%, ${percentageScore >= 50 ? percentageScore >= 75 ? 100 : 50 + 50 * Math.sin(Math.PI * 2 * percentageScore / 100) : 100}% ${percentageScore >= 50 ? percentageScore >= 75 ? 50 : 50 - 50 * Math.cos(Math.PI * 2 * percentageScore / 100) : 100}%, ${percentageScore >= 25 ? percentageScore >= 50 ? 100 : 50 + 50 * Math.sin(Math.PI * 2 * percentageScore / 100) : 50}% ${percentageScore >= 25 ? percentageScore >= 50 ? 100 : 50 - 50 * Math.cos(Math.PI * 2 * percentageScore / 100) : 100}%, ${percentageScore > 0 ? percentageScore >= 25 ? 50 : 50 + 50 * Math.sin(Math.PI * 2 * percentageScore / 100) : 50}% ${percentageScore > 0 ? percentageScore >= 25 ? 100 : 50 - 50 * Math.cos(Math.PI * 2 * percentageScore / 100) : 50}%)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{score}/{quizQuestions.length}</span>
                  </div>
                </div>
              </div>
              
              <div className={`inline-block px-6 py-3 rounded-lg mb-6 ${badge.color}`}>
                <h3 className="text-xl font-semibold">{badge.title}</h3>
                <p className="text-sm mt-1">{badge.description}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Questions Review</h3>
              
              {quizQuestions.map((question, index) => (
                <div key={index} className="mb-6 p-4 rounded-lg bg-gray-50">
                  <p className="font-medium mb-2">
                    {index + 1}. {question.question}
                  </p>
                  
                  <p className="mb-1 text-sm">Your answer:</p>
                  <p className={`text-sm font-medium ${
                    selectedAnswers[index] === question.correctAnswer
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {selectedAnswers[index]}
                  </p>
                  
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <>
                      <p className="mt-2 mb-1 text-sm">Correct answer:</p>
                      <p className="text-sm font-medium text-green-600">{question.correctAnswer}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers(Array(quizQuestions.length).fill(''));
                  setIsQuizComplete(false);
                  setShowResults(false);
                }}
                className="btn-primary"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="w-12 h-12 bg-finbuddy-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-finbuddy-600" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Learn More</h3>
          <p className="text-gray-600">
            Expand your knowledge with our comprehensive financial literacy resources and articles.
          </p>
          <button className="mt-4 text-finbuddy-600 font-medium flex items-center">
            Browse Resources <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="card">
          <div className="w-12 h-12 bg-finbuddy-100 rounded-lg flex items-center justify-center mb-4">
            <Calculator className="h-6 w-6 text-finbuddy-600" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Financial Tools</h3>
          <p className="text-gray-600">
            Access calculators and tools to help you make informed financial decisions.
          </p>
          <button className="mt-4 text-finbuddy-600 font-medium flex items-center">
            Explore Tools <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="card">
          <div className="w-12 h-12 bg-finbuddy-100 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-finbuddy-600" />
          </div>
          <h3 className="text-lg font-semibold mb-3">Get Advice</h3>
          <p className="text-gray-600">
            Chat with our financial assistant for personalized guidance and advice.
          </p>
          <button className="mt-4 text-finbuddy-600 font-medium flex items-center">
            Start Chat <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialQuiz;
