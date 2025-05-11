
import { useState } from "react";

interface ReminderFormData {
  loanType: string;
  bankName: string;
  emiDate: string;
  amount: number;
  nextDue: string;
}

interface EmiReminderFormProps {
  onAdd: (reminder: ReminderFormData) => void;
}

const EmiReminderForm = ({ onAdd }: EmiReminderFormProps) => {
  const [formData, setFormData] = useState<ReminderFormData>({
    loanType: "",
    bankName: "",
    emiDate: "",
    amount: 0,
    nextDue: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReminderFormData, string>>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
    
    // Clear error when field is updated
    if (errors[name as keyof ReminderFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReminderFormData, string>> = {};
    
    if (!formData.loanType.trim()) {
      newErrors.loanType = "Loan type is required";
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    
    if (!formData.emiDate.trim()) {
      newErrors.emiDate = "EMI date is required";
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Valid amount is required";
    }
    
    if (!formData.nextDue.trim()) {
      newErrors.nextDue = "Next due date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAdd(formData);
      // Reset form
      setFormData({
        loanType: "",
        bankName: "",
        emiDate: "",
        amount: 0,
        nextDue: "",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Add New EMI Reminder</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Type
            </label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleInputChange}
              className={`form-input ${errors.loanType ? "border-red-500" : ""}`}
            >
              <option value="">Select Loan Type</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Education Loan">Education Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Gold Loan">Gold Loan</option>
              <option value="Other">Other</option>
            </select>
            {errors.loanType && (
              <p className="text-red-500 text-xs mt-1">{errors.loanType}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              placeholder="e.g., SBI, HDFC"
              className={`form-input ${errors.bankName ? "border-red-500" : ""}`}
            />
            {errors.bankName && (
              <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EMI Date
            </label>
            <input
              type="text"
              name="emiDate"
              value={formData.emiDate}
              onChange={handleInputChange}
              placeholder="e.g., 5th of every month"
              className={`form-input ${errors.emiDate ? "border-red-500" : ""}`}
            />
            {errors.emiDate && (
              <p className="text-red-500 text-xs mt-1">{errors.emiDate}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EMI Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ""}
              onChange={handleInputChange}
              placeholder="e.g., 10000"
              min="1"
              step="100"
              className={`form-input ${errors.amount ? "border-red-500" : ""}`}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Next Due Date
            </label>
            <input
              type="date"
              name="nextDue"
              value={formData.nextDue}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className={`form-input ${errors.nextDue ? "border-red-500" : ""}`}
            />
            {errors.nextDue && (
              <p className="text-red-500 text-xs mt-1">{errors.nextDue}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button type="submit" className="btn-primary">
            Add Reminder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmiReminderForm;
