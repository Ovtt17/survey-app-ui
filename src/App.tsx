import { lazy } from 'react';
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./utils/ScrollToTop";
import Navigation from './components/navigation/Navigation';

const AppRoutes = lazy(() => import('./routes/routes'));

function App() {
  const location = useLocation();
  const hideNavigationAndFooter = ['/register', '/login'].includes(location.pathname);
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
          {!hideNavigationAndFooter && (
            <header>
              <Navigation />
            </header>
          )}
          <main className="relative p-2 flex-grow bg-body">
            <AppRoutes />
          </main>
          {!hideNavigationAndFooter && (
            <footer className="bg-gray-800 p-4">
              {/* Aquí puedes agregar el contenido del pie de página */}
            </footer>
          )}
      </div>
    </AuthProvider>
  );
}

export default App;