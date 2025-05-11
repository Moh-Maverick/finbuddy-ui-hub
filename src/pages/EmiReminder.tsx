
import { useState } from "react";
import EmiReminderForm from "../components/EmiReminderForm";
import { emiRemindersData } from "../data/dummyData";
import { Calendar, ArrowRight } from "lucide-react";

interface Reminder {
  id: number;
  loanType: string;
  bankName: string;
  emiDate: string;
  amount: number;
  nextDue: string;
}

const EmiReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>(emiRemindersData);
  const [showForm, setShowForm] = useState(false);
  
  const handleAddReminder = (reminder: Omit<Reminder, "id">) => {
    const newReminder = {
      ...reminder,
      id: reminders.length > 0 ? Math.max(...reminders.map((r) => r.id)) + 1 : 1,
    };
    
    setReminders([...reminders, newReminder]);
    setShowForm(false);
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };
  
  // Get the current date in ISO format
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate days left until EMI due date
  const getDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    const daysLeftA = getDaysLeft(a.nextDue);
    const daysLeftB = getDaysLeft(b.nextDue);
    return daysLeftA - daysLeftB;
  });

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">EMI Reminders</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Never miss a loan payment again. Set up reminders for all your EMIs.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 bg-finbuddy-50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your EMI Reminders</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center"
            >
              {showForm ? "Cancel" : "Add Reminder"}
            </button>
          </div>

          {showForm && (
            <div className="mb-8">
              <EmiReminderForm onAdd={handleAddReminder} />
            </div>
          )}

          {reminders.length > 0 ? (
            <div className="space-y-4">
              {sortedReminders.map((reminder) => {
                const daysLeft = getDaysLeft(reminder.nextDue);
                let statusColor = "bg-green-100 text-green-800";
                if (daysLeft <= 0) {
                  statusColor = "bg-red-100 text-red-800";
                } else if (daysLeft <= 5) {
                  statusColor = "bg-yellow-100 text-yellow-800";
                }

                return (
                  <div
                    key={reminder.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-5"
                  >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="font-semibold text-lg">{reminder.loanType}</span>
                          <span className={`ml-3 px-3 py-1 rounded-full text-xs ${statusColor}`}>
                            {daysLeft <= 0
                              ? "Overdue!"
                              : daysLeft <= 5
                              ? `Due in ${daysLeft} days`
                              : `Due in ${daysLeft} days`}
                          </span>
                        </div>
                        <div className="text-gray-600 mb-2">
                          {reminder.bankName}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{reminder.emiDate}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:text-right">
                        <div className="text-gray-500 text-sm mb-1">Next Due Date</div>
                        <div className="font-medium">{new Date(reminder.nextDue).toLocaleDateString()}</div>
                        <div className="text-xl font-semibold text-finbuddy-700 mt-2">
                          ₹{reminder.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete Reminder
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center border border-gray-200">
              <p className="text-gray-500 mb-4">You don't have any EMI reminders yet.</p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-flex items-center"
                >
                  Add Your First Reminder 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Tips for Managing EMIs</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-finbuddy-100 text-finbuddy-600 flex items-center justify-center mr-3 mt-1">
                <span className="text-xs">1</span>
              </div>
              <span>Set up auto-payments to avoid missing due dates</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-finbuddy-100 text-finbuddy-600 flex items-center justify-center mr-3 mt-1">
                <span className="text-xs">2</span>
              </div>
              <span>Keep at least 3 months' EMI amount as an emergency fund</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-finbuddy-100 text-finbuddy-600 flex items-center justify-center mr-3 mt-1">
                <span className="text-xs">3</span>
              </div>
              <span>Consider prepaying loans when you have surplus funds</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-finbuddy-100 text-finbuddy-600 flex items-center justify-center mr-3 mt-1">
                <span className="text-xs">4</span>
              </div>
              <span>Avoid taking multiple loans that increase your EMI burden beyond 50% of income</span>
            </li>
          </ul>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">EMI Calculator</h2>
          <p className="text-gray-600 mb-4">
            Quickly estimate your EMI amount for a new loan.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 1000000"
                defaultValue="1000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 8.5"
                defaultValue="8.5"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (years)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g., 20"
                defaultValue="20"
              />
            </div>
            <button className="btn-primary w-full">
              Calculate EMI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiReminder;
