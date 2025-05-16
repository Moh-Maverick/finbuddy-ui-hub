
import { ArrowDown, ArrowUp, Check, X } from "lucide-react";

interface Loan {
  id: number;
  bankName: string;
  interestRate: number;
  tenure: number;
  emi: number;
  maxAmount: number;
  processingFee: number;
}

interface LoanComparisonTableProps {
  loans: Loan[];
  sortConfig: {
    field: 'bankName' | 'interestRate' | 'tenure' | 'emi' | 'processingFee';
    order: 'asc' | 'desc';
  };
  handleSort: (field: 'bankName' | 'interestRate' | 'tenure' | 'emi' | 'processingFee') => void;
}

const LoanComparisonTable = ({
  loans,
  sortConfig,
  handleSort,
}: LoanComparisonTableProps) => {
  const SortIcon = ({ field }: { field: string }) => {
    if (sortConfig.field !== field) return null;
    
    return sortConfig.order === 'asc' ? (
      <ArrowUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 inline ml-1" />
    );
  };
  
  // Find the best (lowest) interest rate
  const bestRate = Math.min(...loans.map(loan => loan.interestRate));
  // Find the lowest EMI
  const lowestEmi = Math.min(...loans.map(loan => loan.emi));

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-finbuddy-50">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('bankName')}
                >
                  <span>Bank</span>
                  <SortIcon field="bankName" />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('interestRate')}
                >
                  <span>Interest Rate (%)</span>
                  <SortIcon field="interestRate" />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('tenure')}
                >
                  <span>Tenure (Years)</span>
                  <SortIcon field="tenure" />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('emi')}
                >
                  <span>EMI (₹)</span>
                  <SortIcon field="emi" />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Loan
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('processingFee')}
                >
                  <span>Processing Fee (%)</span>
                  <SortIcon field="processingFee" />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-finbuddy-50">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{loan.bankName}</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className={`text-sm ${loan.interestRate === bestRate ? 'font-semibold text-green-600' : ''}`}>
                      {loan.interestRate}%
                      {loan.interestRate === bestRate && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Best Rate</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-sm">{loan.tenure} years</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className={`text-sm ${loan.emi === lowestEmi ? 'font-semibold text-green-600' : ''}`}>
                      ₹{loan.emi.toLocaleString()}
                      {loan.emi === lowestEmi && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Lowest</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-sm">₹{(loan.maxAmount/100000).toFixed(1)} Lakh</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-sm">{loan.processingFee}%</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-1" />
                        <span>No prepayment penalty</span>
                      </div>
                      <div className="flex items-center">
                        {loan.id % 2 === 0 ? (
                          <>
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            <span>Home insurance included</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-500 mr-1" />
                            <span>No insurance</span>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-center text-gray-500">
                  No loans match your filter criteria. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanComparisonTable;
