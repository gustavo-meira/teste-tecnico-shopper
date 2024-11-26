import { Header } from './components/Headers/Header/Header';
import { EstimateRidePage } from './pages/EstimateRidePage';

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <EstimateRidePage />
    </div>
  );
};
