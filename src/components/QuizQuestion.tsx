
interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

const QuizQuestion = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
}: QuizQuestionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">{question}</h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="relative">
            <input
              type="radio"
              id={`option-${index}`}
              name="quiz-option"
              className="sr-only"
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
            />
            <label
              htmlFor={`option-${index}`}
              className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAnswer === option
                  ? 'bg-finbuddy-100 border-finbuddy-600'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`h-5 w-5 rounded-full border ${
                  selectedAnswer === option
                    ? 'border-finbuddy-600 bg-finbuddy-600'
                    : 'border-gray-300'
                } mr-4 flex items-center justify-center`}>
                  {selectedAnswer === option && (
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
