import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import CursorBubble from "./components/ui/cursorbubble.tsx";
import ClimateFinance from "./pages/ClimateFinance";
import FinancialActors from "./pages/FinancialActors";
import Projects from "./pages/Projects";
import Event from "./pages/Event";
// import AlgeriaContext from "./pages/AlgeriaContext";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
     {/* <CursorBubble /> */}
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
            <Route path="/finance-climatique" element={<ClimateFinance />} />
           <Route path="/acteurs-financiers" element={<FinancialActors />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/evenement" element={<Event />} />
          {/* <Route path="/contexte-algerie" element={<AlgeriaContext />} /> */}
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/admin" element={<Admin />} />
             
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
