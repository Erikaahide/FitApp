import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

// Páginas (placeholders de momento)
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import PlanSummary from './pages/PlanSummary';
import DayDetail from './pages/DayDetail';
import ShoppingList from './pages/ShoppingList';
import Blog from './pages/Blog';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1 container max-w-5xl py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/plan" element={<PlanSummary />} />
          <Route path="/day" element={<DayDetail />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>

      {/* Espacio para que el bottom nav no tape contenido en mobile */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
