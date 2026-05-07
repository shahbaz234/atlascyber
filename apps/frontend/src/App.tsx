import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';

import AppLayout from './components/layout/AppLayout';

// Use basic dummy layouts and pages to prevent crashing
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import AssetsPage from './pages/AssetsPage';
import IncidentsPage from './pages/IncidentsPage';
import SettingsPage from './pages/SettingsPage';
import CompliancePage from './pages/CompliancePage';
import LandingPage from './pages/LandingPage';

// Placeholder pages for others
const PlaceholderPage = ({ title }: { title: string }) => <div className="p-8 text-white"><h1>{title}</h1><p>This page is currently empty.</p></div>;
const AssetDetailPage = () => <PlaceholderPage title="Asset Detail" />;
const VulnerabilitiesPage = () => <PlaceholderPage title="Vulnerabilities" />;
const ScanDetailPage = () => <PlaceholderPage title="Scan Detail" />;
const SOCPage = () => <PlaceholderPage title="SOC Alerts" />;
const IncidentDetailPage = () => <PlaceholderPage title="Incident Detail" />;
const BillingPage = () => <PlaceholderPage title="Billing" />;
const UsersPage = () => <PlaceholderPage title="Users" />;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* App */}
            <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />


            <Route path="/assets" element={<AppLayout><AssetsPage /></AppLayout>} />
            <Route path="/assets/:id" element={<AppLayout><AssetDetailPage /></AppLayout>} />
            <Route path="/vulnerabilities" element={<AppLayout><VulnerabilitiesPage /></AppLayout>} />
            <Route path="/scans/:id" element={<AppLayout><ScanDetailPage /></AppLayout>} />
            <Route path="/soc" element={<AppLayout><SOCPage /></AppLayout>} />
            <Route path="/incidents" element={<AppLayout><IncidentsPage /></AppLayout>} />
            <Route path="/incidents/:id" element={<AppLayout><IncidentDetailPage /></AppLayout>} />
            <Route path="/compliance" element={<AppLayout><CompliancePage /></AppLayout>} />
            <Route path="/billing" element={<AppLayout><BillingPage /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
            <Route path="/users" element={<AppLayout><UsersPage /></AppLayout>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
