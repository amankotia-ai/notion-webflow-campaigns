
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/webpages" element={
              <ProtectedRoute>
                <MainLayout><Webpages /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/webpages/new" element={
              <ProtectedRoute>
                <MainLayout><WebpageForm /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/webpages/:id" element={
              <ProtectedRoute>
                <MainLayout><WebpageDetail /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/webpages/:id/edit" element={
              <ProtectedRoute>
                <MainLayout><WebpageForm isEdit /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/campaigns" element={
              <ProtectedRoute>
                <MainLayout><Campaigns /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/campaigns/new" element={
              <ProtectedRoute>
                <MainLayout><CampaignForm /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id" element={
              <ProtectedRoute>
                <MainLayout><CampaignDetail /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/edit" element={
              <ProtectedRoute>
                <MainLayout><CampaignForm /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id/rules/:ruleId" element={
              <ProtectedRoute>
                <MainLayout><ContentRuleForm /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <MainLayout><Analytics /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout><Settings /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
