import { Route, Routes } from 'react-router';
import { Header } from './components/Headers/Header/Header';
import { EstimateRidePage } from './pages/EstimateRidePage';

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
          element={<h1>History</h1>}
        />
      </Routes>
    </div>
  );
};
