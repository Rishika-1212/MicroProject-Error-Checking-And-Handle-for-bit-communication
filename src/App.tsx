
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SimulatorPage from "./pages/SimulatorPage";
import NotFound from "./pages/NotFound";
import ParityPage from "./pages/methods/ParityPage";
import ChecksumPage from "./pages/methods/ChecksumPage";
import HammingPage from "./pages/methods/HammingPage";
import CRCPage from "./pages/methods/CRCPage";
import RepetitionPage from "./pages/methods/RepetitionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/methods/parity" element={<ParityPage />} />
          <Route path="/methods/checksum" element={<ChecksumPage />} />
          <Route path="/methods/hamming" element={<HammingPage />} />
          <Route path="/methods/crc" element={<CRCPage />} />
          <Route path="/methods/repetition" element={<RepetitionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
