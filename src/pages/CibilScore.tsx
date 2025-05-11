
import CibilScoreChart from '../components/CibilScoreChart';
import { creditScoreHistory } from '../data/dummyData';

const CibilScore = () => {
  // Simulated CIBIL score
  const currentScore = 790;
  
  // Determine score range and advice
  const getScoreRange = (score: number) => {
    if (score >= 750) {
      return {
        range: 'Excellent',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        advice: 'You have an excellent credit score. You qualify for the best loan offers with competitive interest rates.',
        tips: [
          'Maintain your excellent score by continuing to pay bills on time',
          'You can negotiate for better interest rates with lenders',
          'Consider a credit limit increase to improve your credit utilization ratio further'
        ]
      };
    } else if (score >= 700) {
      return {
        range: 'Good',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        advice: 'You have a good credit score. You qualify for most loans, but might not get the best interest rates.',
        tips: [
          'Pay all your bills on time to maintain or improve your score',
          'Reduce your credit card balances to below 30% of your limit',
          'Avoid applying for multiple new credit accounts in a short period'
        ]
      };
    } else if (score >= 650) {
      return {
        range: 'Fair',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        advice: 'You have a fair credit score. You may qualify for loans but at higher interest rates.',
        tips: [
          'Make all your payments on time for at least 6 months',
          'Reduce your credit card balances to below 30% of your limit',
          'Check your credit report for errors and dispute any inaccuracies'
        ]
      };
    } else {
      return {
        range: 'Poor',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        advice: 'You have a poor credit score. You may find it difficult to qualify for loans or credit cards.',
        tips: [
          'Pay all outstanding debts and make timely payments going forward',
          'Consider a secured credit card to rebuild your credit',
          'Avoid applying for new credit until your score improves'
        ]
      };
    }
  };

  const scoreInfo = getScoreRange(currentScore);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Your CIBIL Score</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Monitor and understand your credit score to improve your financial health.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Score Card */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Current Score</h2>
          
          <div className="flex items-center justify-center my-6">
            <div className={`h-44 w-44 rounded-full flex items-center justify-center ${scoreInfo.bgColor} border-8 border-white shadow`}>
              <div className="text-center">
                <div className="text-4xl font-bold">{currentScore}</div>
                <div className={`text-lg font-medium ${scoreInfo.color}`}>{scoreInfo.range}</div>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${scoreInfo.bgColor} mt-6`}>
            <p className="text-gray-700">{scoreInfo.advice}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Tips to Improve</h3>
            <ul className="space-y-2">
              {scoreInfo.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-finbuddy-100 text-finbuddy-600 text-xs font-medium mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Score History Chart */}
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6">Score History</h2>
          
          <CibilScoreChart scoreHistory={creditScoreHistory} />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-finbuddy-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Score Improvement</h3>
              <p className="text-sm text-gray-600">
                Your credit score has improved by <span className="font-semibold text-green-600">80 points</span> over the last year. Continue your good financial habits.
              </p>
            </div>
            <div className="bg-finbuddy-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Next Update</h3>
              <p className="text-sm text-gray-600">
                Your CIBIL score is typically updated at the beginning of each month. Next update expected on <span className="font-semibold">June 1st</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Score Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Understanding Your Score</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">What is CIBIL Score?</h3>
              <p className="text-gray-600 text-sm">
                A CIBIL score is a 3-digit number between 300-900 that represents your creditworthiness. It is based on your credit history and payment behavior. Lenders check this score before approving loans or credit cards.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">What Makes Up Your Score?</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-finbuddy-400 h-4 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="min-w-[80px] text-sm text-gray-600 ml-3">35% Payment History</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-finbuddy-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="min-w-[80px] text-sm text-gray-600 ml-3">30% Credit Utilization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-finbuddy-600 h-4 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="min-w-[80px] text-sm text-gray-600 ml-3">15% Credit Age</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-finbuddy-700 h-4 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="min-w-[80px] text-sm text-gray-600 ml-3">10% Credit Types</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-finbuddy-800 h-4 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="min-w-[80px] text-sm text-gray-600 ml-3">10% New Credit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Credit Score Ranges</h2>
          
          <div className="space-y-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-green-800">Excellent</h3>
                <span className="font-medium text-green-800">750-900</span>
              </div>
              <p className="text-sm text-gray-700">
                Best interest rates and loan terms. Easily approved for premium credit cards.
              </p>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-blue-800">Good</h3>
                <span className="font-medium text-blue-800">700-749</span>
              </div>
              <p className="text-sm text-gray-700">
                Good loan terms and credit card offers. Most applications approved.
              </p>
            </div>
            
            <div className="bg-yellow-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-yellow-800">Fair</h3>
                <span className="font-medium text-yellow-800">650-699</span>
              </div>
              <p className="text-sm text-gray-700">
                Average interest rates. Loan approval likely but might require additional documentation.
              </p>
            </div>
            
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-orange-800">Poor</h3>
                <span className="font-medium text-orange-800">600-649</span>
              </div>
              <p className="text-sm text-gray-700">
                Higher interest rates. Limited options for loans and credit cards.
              </p>
            </div>
            
            <div className="bg-red-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-red-800">Very Poor</h3>
                <span className="font-medium text-red-800">300-599</span>
              </div>
              <p className="text-sm text-gray-700">
                Difficult to get approved for most loans. May require secured credit cards to build credit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CibilScore;
