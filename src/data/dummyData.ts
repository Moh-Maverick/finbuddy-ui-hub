
// Loan comparison data
export const loansData = [
  {
    id: 1,
    bankName: "SBI Bank",
    interestRate: 8.5,
    tenure: 20,
    emi: 8675,
    maxAmount: 5000000,
    processingFee: 0.5
  },
  {
    id: 2,
    bankName: "HDFC Bank",
    interestRate: 8.7,
    tenure: 20,
    emi: 8795,
    maxAmount: 7500000,
    processingFee: 0.6
  },
  {
    id: 3,
    bankName: "ICICI Bank",
    interestRate: 8.6,
    tenure: 25,
    emi: 7685,
    maxAmount: 8000000,
    processingFee: 0.5
  },
  {
    id: 4,
    bankName: "Axis Bank",
    interestRate: 8.8,
    tenure: 20,
    emi: 8835,
    maxAmount: 6000000,
    processingFee: 0.65
  },
  {
    id: 5,
    bankName: "Bank of Baroda",
    interestRate: 8.4,
    tenure: 15,
    emi: 9825,
    maxAmount: 4000000,
    processingFee: 0.45
  },
  {
    id: 6,
    bankName: "Punjab National Bank",
    interestRate: 8.35,
    tenure: 20,
    emi: 8575,
    maxAmount: 5500000,
    processingFee: 0.5
  },
  {
    id: 7,
    bankName: "Canara Bank",
    interestRate: 8.55,
    tenure: 15,
    emi: 9935,
    maxAmount: 4500000,
    processingFee: 0.4
  }
];

// EMI Reminders data
export const emiRemindersData = [
  {
    id: 1,
    loanType: "Home Loan",
    bankName: "SBI Bank",
    emiDate: "5th of every month",
    amount: 8675,
    nextDue: "2023-06-05"
  },
  {
    id: 2,
    loanType: "Car Loan",
    bankName: "HDFC Bank",
    emiDate: "10th of every month",
    amount: 12500,
    nextDue: "2023-06-10"
  },
  {
    id: 3,
    loanType: "Personal Loan",
    bankName: "ICICI Bank",
    emiDate: "15th of every month",
    amount: 5500,
    nextDue: "2023-06-15"
  }
];

// Credit Score History for Chart
export const creditScoreHistory = [
  { month: "Jan", score: 710 },
  { month: "Feb", score: 720 },
  { month: "Mar", score: 725 },
  { month: "Apr", score: 715 },
  { month: "May", score: 735 },
  { month: "Jun", score: 750 },
  { month: "Jul", score: 755 },
  { month: "Aug", score: 760 },
  { month: "Sep", score: 765 },
  { month: "Oct", score: 780 },
  { month: "Nov", score: 785 },
  { month: "Dec", score: 790 }
];

// Quiz questions
export const quizQuestions = [
  {
    id: 1,
    question: "What is a CIBIL score?",
    options: [
      "A score that determines your educational qualifications",
      "A credit score that represents your creditworthiness",
      "A score determined by your savings account balance",
      "A score based on your social media presence"
    ],
    correctAnswer: "A credit score that represents your creditworthiness"
  },
  {
    id: 2,
    question: "Which of the following will NOT improve your credit score?",
    options: [
      "Paying bills on time",
      "Keeping credit utilization low",
      "Applying for multiple credit cards at once",
      "Having a long credit history"
    ],
    correctAnswer: "Applying for multiple credit cards at once"
  },
  {
    id: 3,
    question: "What is EMI?",
    options: [
      "Extra Money Investment",
      "Equated Monthly Installment",
      "Electronic Money Interface",
      "Extended Mortgage Insurance"
    ],
    correctAnswer: "Equated Monthly Installment"
  },
  {
    id: 4,
    question: "What is compound interest?",
    options: [
      "Interest calculated only on the principal amount",
      "Interest calculated on both principal and accumulated interest",
      "Interest paid directly to the government",
      "A fixed rate interest regardless of time period"
    ],
    correctAnswer: "Interest calculated on both principal and accumulated interest"
  },
  {
    id: 5,
    question: "Which loan typically has the lowest interest rate?",
    options: [
      "Personal loan",
      "Credit card loan",
      "Home loan",
      "Payday loan"
    ],
    correctAnswer: "Home loan"
  }
];
