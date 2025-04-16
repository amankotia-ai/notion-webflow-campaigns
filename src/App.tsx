
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Webpages from "./pages/Webpages";
import WebpageDetail from "./pages/WebpageDetail";
import WebpageForm from "./pages/WebpageForm";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import CampaignForm from "./pages/CampaignForm";
import ContentRuleForm from "./pages/ContentRuleForm";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/webpages" element={<MainLayout><Webpages /></MainLayout>} />
          <Route path="/webpages/new" element={<MainLayout><WebpageForm /></MainLayout>} />
          <Route path="/webpages/:id" element={<MainLayout><WebpageDetail /></MainLayout>} />
          <Route path="/webpages/:id/edit" element={<MainLayout><WebpageForm isEdit /></MainLayout>} />
          <Route path="/campaigns" element={<MainLayout><Campaigns /></MainLayout>} />
          <Route path="/campaigns/new" element={<MainLayout><CampaignForm /></MainLayout>} />
          <Route path="/campaigns/:id" element={<MainLayout><CampaignDetail /></MainLayout>} />
          <Route path="/campaigns/:id/edit" element={<MainLayout><CampaignForm /></MainLayout>} />
          <Route path="/campaigns/:id/rules/:ruleId" element={<MainLayout><ContentRuleForm /></MainLayout>} />
          <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
