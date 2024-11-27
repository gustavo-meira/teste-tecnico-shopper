import { Route, Routes } from 'react-router';
import { Header } from './components/Headers/Header/Header';
import { EstimateRidePage } from './pages/EstimateRidePage';
import { HistoryPage } from './pages/HistoryPage';

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<EstimateRidePage />}
        />
        <Route
          path="/history"
          element={<HistoryPage />}
        />
      </Routes>
    </div>
  );
};
