
import { Link } from 'react-router-dom';
import { MessageSquare, Calculator, PieChart, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero section */}
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Smart Financial Assistant
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Manage your finances with confidence using FinBuddy's AI-powered tools. 
              Get personalized advice, compare loans, check eligibility, and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/chatbot" className="btn-primary">
                Try Chatbot
              </Link>
              <Link to="/loan-eligibility" className="btn-secondary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-finbuddy-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simplify Your Financial Decisions
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              FinBuddy offers easy-to-use tools and friendly guidance to help you make better financial choices.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="card flex flex-col">
                <div className="mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-finbuddy-100">
                    <MessageSquare className="h-6 w-6 text-finbuddy-600" aria-hidden="true" />
                  </div>
                </div>
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  AI-Powered Chatbot
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Get personalized financial advice in multiple languages using our friendly AI assistant.
                  </p>
                  <p className="mt-6">
                    <Link to="/chatbot" className="text-sm font-semibold leading-6 text-finbuddy-600">
                      Try it now <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>

              {/* Feature 2 */}
              <div className="card flex flex-col">
                <div className="mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-finbuddy-100">
                    <Calculator className="h-6 w-6 text-finbuddy-600" aria-hidden="true" />
                  </div>
                </div>
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  Loan Eligibility & Comparison
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Check your loan eligibility and compare options from different banks to find the best deal.
                  </p>
                  <p className="mt-6">
                    <Link to="/loan-eligibility" className="text-sm font-semibold leading-6 text-finbuddy-600">
                      Check eligibility <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>

              {/* Feature 3 */}
              <div className="card flex flex-col">
                <div className="mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-finbuddy-100">
                    <PieChart className="h-6 w-6 text-finbuddy-600" aria-hidden="true" />
                  </div>
                </div>
                <dt className="text-lg font-semibold leading-7 text-gray-900">
                  CIBIL Score & EMI Management
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Track your credit score, understand its impact, and manage your EMI payments efficiently.
                  </p>
                  <p className="mt-6">
                    <Link to="/cibil-score" className="text-sm font-semibold leading-6 text-finbuddy-600">
                      View score <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 sm:py-24 px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-finbuddy-600 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to improve your financial literacy?
              </h2>
              <p className="mt-6 text-lg leading-8 text-finbuddy-100">
                Take our quiz and learn essential financial concepts that will help you make smarter decisions.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link to="/financial-quiz" className="btn-accent">
                  Take the Quiz
                </Link>
                <Link to="/chatbot" className="text-sm font-semibold leading-6 text-white">
                  Chat with FinBuddy <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
