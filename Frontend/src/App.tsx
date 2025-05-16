
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chatbot from "./pages/Chatbot";
import LoanEligibility from "./pages/LoanEligibility";
import LoanComparison from "./pages/LoanComparison";
import CibilScore from "./pages/CibilScore";
import EmiReminder from "./pages/EmiReminder";
import FinancialQuiz from "./pages/FinancialQuiz";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/loan-eligibility" element={<LoanEligibility />} />
              <Route path="/loan-comparison" element={<LoanComparison />} />
              <Route path="/cibil-score" element={<CibilScore />} />
              <Route path="/emi-reminder" element={<EmiReminder />} />
              <Route path="/financial-quiz" element={<FinancialQuiz />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
