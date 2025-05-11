
import { useState } from 'react';

interface EligibilityFormData {
  age: number;
  income: number;
  employmentStatus: string;
  existingEmis: number;
  loanAmount: number;
  loanTerm: number;
}

const LoanEligibility = () => {
  const [formData, setFormData] = useState<EligibilityFormData>({
    age: 30,
    income: 50000,
    employmentStatus: 'salaried',
    existingEmis: 0,
    loanAmount: 2000000,
    loanTerm: 20,
  });
  
  const [result, setResult] = useState<null | {
    eligible: boolean;
    maxAmount?: number;
    reason?: string;
    emi?: number;
  }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'employmentStatus' ? value : Number(value),
    });
  };

  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple eligibility calculation logic
    // In real app, this would be more complex
    const { age, income, employmentStatus, existingEmis, loanAmount, loanTerm } = formData;
    
    // Maximum loan amount (50% of income for EMI)
    const maxEmiPercentage = 0.5;
    const maxMonthlyPayment = income * maxEmiPercentage - existingEmis;
    
    // Approximate monthly EMI per lakh (100,000) for 20 years at 8.5%
    const emiPerLakhFor20Years = 867; // At 8.5% for 20 years
    
    // Maximum eligible loan amount
    const maxLoanAmount = Math.floor(maxMonthlyPayment / emiPerLakhFor20Years * 100000);
    
    // Requested EMI calculation (very simplified)
    const requestedEmi = (loanAmount / 100000) * emiPerLakhFor20Years;
    
    // Eligibility checks
    let eligible = true;
    let reason = '';
    
    if (age < 21 || age > 60) {
      eligible = false;
      reason = 'Age should be between 21 and 60 years.';
    } else if (income < 25000) {
      eligible = false;
      reason = 'Minimum income requirement is ₹25,000 per month.';
    } else if (existingEmis + requestedEmi > income * maxEmiPercentage) {
      eligible = false;
      reason = `Your EMI burden exceeds 50% of your income. Maximum loan amount you are eligible for is ₹${maxLoanAmount.toLocaleString()}.`;
    } else if (employmentStatus === 'unemployed') {
      eligible = false;
      reason = 'You need to be employed or self-employed to be eligible for a loan.';
    }
    
    setResult({
      eligible,
      maxAmount: maxLoanAmount,
      reason: reason,
      emi: Math.round(requestedEmi),
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Loan Eligibility Checker</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find out if you're eligible for a loan and how much you can borrow based on your financial profile.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6 bg-finbuddy-50">
            <h2 className="text-xl font-semibold mb-6">Enter Your Details</h2>
            
            <form onSubmit={calculateEligibility}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="form-input"
                  min="18"
                  max="70"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (₹)</label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className="form-input"
                  min="0"
                  step="1000"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                <select 
                  name="employmentStatus" 
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Existing Monthly EMIs (₹)</label>
                <input
                  type="number"
                  name="existingEmis"
                  value={formData.existingEmis}
                  onChange={handleInputChange}
                  className="form-input"
                  min="0"
                  step="100"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Loan Amount (₹)</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="form-input"
                  min="100000"
                  step="100000"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
                <input
                  type="number"
                  name="loanTerm"
                  value={formData.loanTerm}
                  onChange={handleInputChange}
                  className="form-input"
                  min="1"
                  max="30"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Check Eligibility
              </button>
            </form>
          </div>
          
          <div className="md:w-1/2 p-6">
            <h2 className="text-xl font-semibold mb-6">Eligibility Result</h2>
            
            {result ? (
              <div className={`p-6 rounded-lg ${result.eligible ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center mb-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    result.eligible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {result.eligible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold ml-4">
                    {result.eligible ? 'Congratulations! You are eligible' : 'Sorry, you are not eligible'}
                  </h3>
                </div>
                
                {result.eligible ? (
                  <div className="space-y-3">
                    <p className="text-gray-600">Based on your income and existing obligations, you are eligible for the requested loan.</p>
                    
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Maximum Loan Amount:</span>
                        <span className="font-semibold">₹{result.maxAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Monthly EMI:</span>
                        <span className="font-semibold">₹{result.emi?.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      *The actual loan amount and EMI may vary based on the lender's policies, your credit score, and other factors.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-3">{result.reason}</p>
                    <p className="text-sm text-gray-500">
                      Consider improving your eligibility by increasing your income, reducing existing EMIs, or applying for a smaller loan amount.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-finbuddy-50 p-6 rounded-lg">
                <div className="text-center py-8">
                  <p className="text-gray-500">Fill out the form and submit to check your loan eligibility.</p>
                </div>
              </div>
            )}
            
            <div className="mt-6 bg-finbuddy-50 p-4 rounded-lg">
              <h3 className="text-md font-medium mb-2">Eligibility Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Maintain a good credit score (above 750)</li>
                <li>• Keep your total EMI burden under 50% of income</li>
                <li>• Have a stable employment history (2+ years)</li>
                <li>• Clear existing debts to improve eligibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanEligibility;
