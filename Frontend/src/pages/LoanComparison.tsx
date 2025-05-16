
import { useState } from 'react';
import LoanComparisonTable from '../components/LoanComparisonTable';
import { loansData } from '../data/dummyData';

type SortField = 'bankName' | 'interestRate' | 'tenure' | 'emi' | 'processingFee';
type SortOrder = 'asc' | 'desc';

const LoanComparison = () => {
  const [loans, setLoans] = useState(loansData);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    order: SortOrder;
  }>({
    field: 'interestRate',
    order: 'asc',
  });
  
  const [filters, setFilters] = useState({
    minInterestRate: '',
    maxInterestRate: '',
    minTenure: '',
    maxTenure: '',
    bankName: '',
  });

  const handleSort = (field: SortField) => {
    let order: SortOrder = 'asc';
    if (sortConfig.field === field && sortConfig.order === 'asc') {
      order = 'desc';
    }
    
    setSortConfig({ field, order });
    
    // Sort the loans
    const sortedLoans = [...loans].sort((a, b) => {
      if (a[field] < b[field]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setLoans(sortedLoans);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filteredLoans = [...loansData];
    
    // Filter by interest rate range
    if (filters.minInterestRate) {
      filteredLoans = filteredLoans.filter(
        (loan) => loan.interestRate >= Number(filters.minInterestRate)
      );
    }
    
    if (filters.maxInterestRate) {
      filteredLoans = filteredLoans.filter(
        (loan) => loan.interestRate <= Number(filters.maxInterestRate)
      );
    }
    
    // Filter by tenure range
    if (filters.minTenure) {
      filteredLoans = filteredLoans.filter(
        (loan) => loan.tenure >= Number(filters.minTenure)
      );
    }
    
    if (filters.maxTenure) {
      filteredLoans = filteredLoans.filter(
        (loan) => loan.tenure <= Number(filters.maxTenure)
      );
    }
    
    // Filter by bank name
    if (filters.bankName) {
      filteredLoans = filteredLoans.filter((loan) =>
        loan.bankName.toLowerCase().includes(filters.bankName.toLowerCase())
      );
    }
    
    setLoans(filteredLoans);
  };

  const resetFilters = () => {
    setFilters({
      minInterestRate: '',
      maxInterestRate: '',
      minTenure: '',
      maxTenure: '',
      bankName: '',
    });
    setLoans(loansData);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Loan Comparison</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compare loan options from different banks to find the best deal for your needs.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 bg-finbuddy-50">
          <h2 className="text-xl font-semibold mb-6">Filter Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={filters.bankName}
                onChange={handleFilterChange}
                placeholder="Search banks..."
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Interest Rate (%)</label>
              <input
                type="number"
                name="minInterestRate"
                value={filters.minInterestRate}
                onChange={handleFilterChange}
                placeholder="e.g., 8.0"
                className="form-input"
                step="0.1"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Interest Rate (%)</label>
              <input
                type="number"
                name="maxInterestRate"
                value={filters.maxInterestRate}
                onChange={handleFilterChange}
                placeholder="e.g., 10.0"
                className="form-input"
                step="0.1"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Tenure (years)</label>
              <input
                type="number"
                name="minTenure"
                value={filters.minTenure}
                onChange={handleFilterChange}
                placeholder="e.g., 5"
                className="form-input"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Tenure (years)</label>
              <input
                type="number"
                name="maxTenure"
                value={filters.maxTenure}
                onChange={handleFilterChange}
                placeholder="e.g., 30"
                className="form-input"
                min="0"
              />
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <button onClick={applyFilters} className="btn-primary">
              Apply Filters
            </button>
            <button onClick={resetFilters} className="btn-secondary">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <LoanComparisonTable 
        loans={loans} 
        sortConfig={sortConfig} 
        handleSort={handleSort} 
      />

      <div className="mt-8 bg-finbuddy-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Understanding Loan Terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Interest Rate</h3>
            <p className="text-sm text-gray-600">
              The annual interest rate charged on the loan. Lower rates mean less interest payment over the loan term.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Tenure</h3>
            <p className="text-sm text-gray-600">
              The duration of the loan in years. Longer tenures reduce EMI but increase total interest paid.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">EMI</h3>
            <p className="text-sm text-gray-600">
              Equated Monthly Installment - the fixed amount paid every month toward loan repayment.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Processing Fee</h3>
            <p className="text-sm text-gray-600">
              One-time fee charged by the bank to process your loan application, usually a percentage of the loan amount.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Max Loan Amount</h3>
            <p className="text-sm text-gray-600">
              The maximum amount the bank is willing to lend under this loan scheme.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Comparing Loans</h3>
            <p className="text-sm text-gray-600">
              Look beyond the interest rate. Consider processing fees, prepayment charges, and flexibility of terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanComparison;
