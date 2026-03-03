import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Troynik from "./pages/Troynik";
import Razdvizhnoy from "./pages/Razdvizhnoy";
import Vozdukhovod from "./pages/Vozdukhovod";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/60" element={<Index angle={60} />} />
          <Route path="/45" element={<Index angle={45} />} />
          <Route path="/30" element={<Index angle={30} />} />
          <Route path="/15" element={<Index angle={15} />} />
          <Route path="/troynik" element={<Troynik />} />
          <Route path="/razdvizhnoy" element={<Razdvizhnoy />} />
          <Route path="/vozdukhovod" element={<Vozdukhovod />} />
          <Route path="/product/:article" element={<Product />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
