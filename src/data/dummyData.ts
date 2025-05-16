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
    correctAnswer: "A credit score that represents your creditworthiness",
    difficulty: "easy",
    category: "credit",
    explanation: "CIBIL score is a three-digit number that represents your creditworthiness based on your credit history and repayment behavior."
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
    correctAnswer: "Applying for multiple credit cards at once",
    difficulty: "medium",
    category: "credit",
    explanation: "Multiple credit applications in a short time can indicate financial distress and negatively impact your credit score."
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
    correctAnswer: "Equated Monthly Installment",
    difficulty: "easy",
    category: "loans",
    explanation: "EMI stands for Equated Monthly Installment, which is a fixed payment amount made by a borrower to a lender on a specified date each month."
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
    correctAnswer: "Interest calculated on both principal and accumulated interest",
    difficulty: "medium",
    category: "investment",
    explanation: "Compound interest is calculated on the initial principal and also on the accumulated interest from previous periods, making your money grow faster."
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
    correctAnswer: "Home loan",
    difficulty: "easy",
    category: "loans",
    explanation: "Home loans typically have the lowest interest rates because they are secured by the property, reducing risk for the lender."
  },
  {
    id: 6,
    question: "What is the Rule of 72 used for in finance?",
    options: [
      "Calculating monthly EMI payments",
      "Estimating how long it takes for an investment to double",
      "Determining tax liability percentage",
      "Calculating credit utilization ratio"
    ],
    correctAnswer: "Estimating how long it takes for an investment to double",
    difficulty: "hard",
    category: "investment",
    explanation: "The Rule of 72 is a simple way to determine how long an investment will take to double. Just divide 72 by the annual rate of return."
  },
  {
    id: 7,
    question: "What is the primary purpose of an emergency fund?",
    options: [
      "To save for retirement",
      "To cover unexpected expenses or income loss",
      "To earn high investment returns",
      "To pay for annual vacations"
    ],
    correctAnswer: "To cover unexpected expenses or income loss",
    difficulty: "easy",
    category: "savings",
    explanation: "An emergency fund is meant to provide financial security by covering unexpected costs like medical emergencies or living expenses during job loss."
  },
  {
    id: 8,
    question: "What is dollar-cost averaging?",
    options: [
      "Converting all investments to US dollars",
      "Investing a fixed amount at regular intervals regardless of price",
      "Buying stocks only when prices are falling",
      "A tax strategy for international investments"
    ],
    correctAnswer: "Investing a fixed amount at regular intervals regardless of price",
    difficulty: "medium",
    category: "investment",
    explanation: "Dollar-cost averaging involves regularly investing a fixed amount, which buys more shares when prices are low and fewer when prices are high."
  },
  {
    id: 9,
    question: "What is the difference between a debit card and a credit card?",
    options: [
      "There is no difference",
      "Debit card withdraws money from your bank account; credit card borrows money",
      "Debit cards can only be used online; credit cards can be used anywhere",
      "Debit cards are for businesses; credit cards are for individuals"
    ],
    correctAnswer: "Debit card withdraws money from your bank account; credit card borrows money",
    difficulty: "easy",
    category: "banking",
    explanation: "A debit card uses your existing bank funds, while a credit card lets you borrow money that you must repay later, potentially with interest."
  },
  {
    id: 10,
    question: "What is diversification in investing?",
    options: [
      "Investing all your money in different cryptocurrencies",
      "Spreading investments across various asset classes to reduce risk",
      "Investing only in foreign markets",
      "Changing your investment strategy every month"
    ],
    correctAnswer: "Spreading investments across various asset classes to reduce risk",
    difficulty: "medium",
    category: "investment",
    explanation: "Diversification involves spreading investments across different asset types to reduce risk, as poor performance in one might be offset by good performance in another."
  },
  {
    id: 11,
    question: "What is a mutual fund?",
    options: [
      "A government scheme to provide financial aid",
      "A pool of money from multiple investors used to buy stocks, bonds, etc.",
      "A type of cryptocurrency",
      "A high-interest savings account"
    ],
    correctAnswer: "A pool of money from multiple investors used to buy stocks, bonds, etc.",
    difficulty: "medium",
    category: "investment",
    explanation: "A mutual fund pools money from many investors to purchase a diversified portfolio of securities, professionally managed by fund managers."
  },
  {
    id: 12,
    question: "What is inflation?",
    options: [
      "The increase in stock market prices",
      "The general increase in prices and fall in purchasing power of money",
      "The interest rate set by central banks",
      "The growth rate of an economy"
    ],
    correctAnswer: "The general increase in prices and fall in purchasing power of money",
    difficulty: "easy",
    category: "economics",
    explanation: "Inflation is the rate at which prices increase over time, resulting in a decrease in the purchasing power of money."
  },
  {
    id: 13,
    question: "What is a SIP in mutual fund investing?",
    options: [
      "Special Investment Plan",
      "Systematic Interest Payment",
      "Systematic Investment Plan",
      "Selective Investment Protocol"
    ],
    correctAnswer: "Systematic Investment Plan",
    difficulty: "medium",
    category: "investment",
    explanation: "SIP (Systematic Investment Plan) lets you invest a fixed amount in mutual funds at regular intervals, benefiting from rupee-cost averaging."
  },
  {
    id: 14,
    question: "What does P/E ratio stand for in stock valuation?",
    options: [
      "Profit/Earnings ratio",
      "Price/Earnings ratio",
      "Paid/Expected ratio",
      "Performance/Efficiency ratio"
    ],
    correctAnswer: "Price/Earnings ratio",
    difficulty: "hard",
    category: "investment",
    explanation: "Price-to-Earnings (P/E) ratio is a valuation ratio that compares a company's current share price to its per-share earnings."
  },
  {
    id: 15,
    question: "Which of the following is NOT considered a liquid asset?",
    options: [
      "Cash",
      "Savings account balance",
      "Real estate property",
      "Money market funds"
    ],
    correctAnswer: "Real estate property",
    difficulty: "medium",
    category: "investment",
    explanation: "Real estate is not considered liquid as it typically takes time to sell and convert to cash, unlike other options that can be quickly accessed."
  }
];
