
import { useState, useEffect } from 'react';
import { MessageSquare, Calculator, BookOpen, ArrowRight, Trophy, Clock, Award } from 'lucide-react';
import QuizQuestion from '../components/QuizQuestion';
import { quizQuestions } from '../data/dummyData';
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from 'react-hook-form';

interface QuizSettings {
  questionsCount: number;
  categories: string[];
  difficulty: string;
}

const FinancialQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(quizQuestions.length).fill(''));
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(quizQuestions);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
  const [timerActive, setTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const form = useForm<QuizSettings>({
    defaultValues: {
      questionsCount: 5,
      categories: ["all"],
      difficulty: "all"
    }
  });

  // Extract all unique categories from questions
  const categories = [...new Set(quizQuestions.map(q => q.category))];
  const difficulties = ["easy", "medium", "hard"];
  
  // Handle timer countdown
  useEffect(() => {
    let interval: number | null = null;
    
    if (timerActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerActive) {
      // Time's up for this question
      handleAnswerTimeout();
    }
    
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [timerActive, timeRemaining]);
  
  const handleAnswerTimeout = () => {
    setStreak(0); // Reset streak when timeout
    toast({
      title: "Time's up!",
      description: "You ran out of time for this question.",
      variant: "destructive"
    });
    handleNextQuestion();
  };

  const startQuiz = (data: QuizSettings) => {
    let filteredQuestions = [...quizQuestions];
    
    // Filter by category if not "all"
    if (!data.categories.includes("all")) {
      filteredQuestions = filteredQuestions.filter(q => 
        data.categories.includes(q.category as string)
      );
    }
    
    // Filter by difficulty if not "all"
    if (data.difficulty !== "all") {
      filteredQuestions = filteredQuestions.filter(q => 
        q.difficulty === data.difficulty
      );
    }
    
    // Limit number of questions
    filteredQuestions = filteredQuestions.slice(0, data.questionsCount);
    
    // If no questions match criteria
    if (filteredQuestions.length === 0) {
      toast({
        title: "No questions available",
        description: "Please try different settings",
        variant: "destructive"
      });
      return;
    }
    
    // Shuffle questions
    filteredQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
    
    setActiveQuestions(filteredQuestions);
    setSelectedAnswers(Array(filteredQuestions.length).fill(''));
    setCurrentQuestionIndex(0);
    setIsQuizComplete(false);
    setShowResults(false);
    setQuizStarted(true);
    setShowSettings(false);
    setTimeRemaining(30);
    setTimerActive(true);
    setStreak(0);
    setPoints(0);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
    
    // Check if answer is correct and award points
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // Award points based on difficulty and time remaining
    if (isCorrect) {
      const difficultyMultiplier = 
        currentQuestion.difficulty === "easy" ? 1 :
        currentQuestion.difficulty === "medium" ? 2 : 3;
        
      const timeBonus = Math.floor(timeRemaining / 5);
      const pointsEarned = 10 * difficultyMultiplier + timeBonus;
      
      setPoints(prev => prev + pointsEarned);
      setStreak(prev => prev + 1);
      
      if (streak + 1 >= 3) {
        toast({
          title: "Hot Streak! 🔥",
          description: `${streak + 1} correct answers in a row!`,
        });
      }
      
      toast({
        title: "Correct!",
        description: `+${pointsEarned} points`,
        variant: "success"
      });
    } else {
      setStreak(0);
      toast({
        title: "Incorrect",
        description: currentQuestion.explanation,
        variant: "destructive"
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(30); // Reset timer for next question
    } else {
      setIsQuizComplete(true);
      setTimerActive(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeRemaining(30); // Reset timer
    }
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentageScore = (score / activeQuestions.length) * 100;

  const getBadge = () => {
    if (percentageScore >= 80) {
      return {
        title: "Financial Expert",
        description: "Congratulations! You have excellent financial knowledge.",
        color: "bg-green-100 text-green-800",
        icon: <Trophy className="h-6 w-6" />
      };
    } else if (percentageScore >= 60) {
      return {
        title: "Finance Savvy",
        description: "Good job! You have a solid understanding of financial concepts.",
        color: "bg-blue-100 text-blue-800",
        icon: <Award className="h-6 w-6" />
      };
    } else if (percentageScore >= 40) {
      return {
        title: "Financial Learner",
        description: "Not bad! You're on your way to becoming financially literate.",
        color: "bg-yellow-100 text-yellow-800",
        icon: <BookOpen className="h-6 w-6" />
      };
    } else {
      return {
        title: "Financial Novice",
        description: "Keep learning! Building financial knowledge takes time.",
        color: "bg-red-100 text-red-800",
        icon: <Calculator className="h-6 w-6" />
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
        {!quizStarted ? (
          <div className="p-6">
            <div className="text-center mb-8">
              <Trophy className="h-16 w-16 text-finbuddy-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Financial Knowledge Challenge</h2>
              <p className="text-gray-600">
                Test your financial IQ, earn points, and learn new concepts! 
                How financially savvy are you?
              </p>
              
              <div className="mt-8 flex justify-center gap-4">
                <button 
                  className="btn-primary px-6" 
                  onClick={() => startQuiz(form.getValues())}
                >
                  Quick Start
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => setShowSettings(true)}
                >
                  Customize Quiz
                </button>
              </div>
            </div>
            
            {showSettings && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Quiz Settings</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(startQuiz)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="questionsCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Questions</FormLabel>
                          <FormControl>
                            <input
                              type="range"
                              min={3}
                              max={15}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </FormControl>
                          <div className="text-center">{field.value} questions</div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => field.onChange([value])}
                              defaultValue="all"
                              className="grid grid-cols-2 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all" />
                                <FormLabel htmlFor="all">All Categories</FormLabel>
                              </div>
                              {categories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                  <RadioGroupItem value={category} id={category} />
                                  <FormLabel htmlFor={category} className="capitalize">
                                    {category}
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue="all"
                              className="grid grid-cols-2 gap-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="diff-all" />
                                <FormLabel htmlFor="diff-all">All Levels</FormLabel>
                              </div>
                              {difficulties.map((difficulty) => (
                                <div key={difficulty} className="flex items-center space-x-2">
                                  <RadioGroupItem value={difficulty} id={difficulty} />
                                  <FormLabel htmlFor={difficulty} className="capitalize">
                                    {difficulty}
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-center gap-4 pt-2">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowSettings(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Start Quiz
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            <div className="mt-10 p-6 bg-finbuddy-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">How to Play</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Answer questions within the time limit (30 seconds per question)</li>
                <li>Earn points based on difficulty and how fast you answer</li>
                <li>Build answer streaks for bonus recognition</li>
                <li>Learn from explanations for wrong answers</li>
                <li>Earn badges based on your performance</li>
              </ul>
            </div>
          </div>
        ) : !showResults ? (
          <div className="p-6">
            {/* Quiz stats bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-finbuddy-600" />
                <span className="font-semibold">{points} points</span>
              </div>
              
              {streak >= 2 && (
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-semibold">Streak: {streak}</span>
                  <span className="text-lg">🔥</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-finbuddy-600" />
                <span className={`font-semibold ${timeRemaining < 10 ? "text-red-600" : ""}`}>
                  {timeRemaining}s
                </span>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentQuestionIndex + 1} of {activeQuestions.length}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(((currentQuestionIndex + 1) / activeQuestions.length) * 100)}% Complete
                </span>
              </div>
              <Progress 
                value={((currentQuestionIndex + 1) / activeQuestions.length) * 100} 
                className="h-2 bg-gray-200"
              />
            </div>
            
            {/* Difficulty badge */}
            {activeQuestions[currentQuestionIndex]?.difficulty && (
              <div className="mb-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  activeQuestions[currentQuestionIndex]?.difficulty === "easy" 
                    ? "bg-green-100 text-green-800" 
                    : activeQuestions[currentQuestionIndex]?.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {activeQuestions[currentQuestionIndex]?.difficulty?.toUpperCase()}
                </span>
                <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 capitalize">
                  {activeQuestions[currentQuestionIndex]?.category}
                </span>
              </div>
            )}

            {/* Current question */}
            <QuizQuestion
              question={activeQuestions[currentQuestionIndex].question}
              options={activeQuestions[currentQuestionIndex].options}
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
                    <span className="text-3xl font-bold">{score}/{activeQuestions.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-bold mb-2">Total Points: {points}</div>
              </div>
              
              <div className={`inline-flex items-center px-6 py-3 rounded-lg mb-6 ${badge.color}`}>
                <div className="mr-3">
                  {badge.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold">{badge.title}</h3>
                  <p className="text-sm mt-1">{badge.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Questions Review</h3>
              
              {activeQuestions.map((question, index) => (
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
                  
                  <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                    <p className="font-medium text-blue-800">Explanation:</p>
                    <p className="text-blue-700">{question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers(Array(activeQuestions.length).fill(''));
                  setIsQuizComplete(false);
                  setShowResults(false);
                  setTimeRemaining(30);
                  setTimerActive(true);
                  setStreak(0);
                  setPoints(0);
                }}
                className="btn-primary"
              >
                Retake Quiz
              </button>
              
              <button 
                onClick={() => {
                  setQuizStarted(false);
                  setIsQuizComplete(false);
                  setShowResults(false);
                }}
                className="btn-secondary"
              >
                Try Different Quiz
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
