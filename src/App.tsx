import { Suspense, lazy } from 'react';
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./utils/ScrollToTop";

const Navigation = lazy(() => import('./components/navigation/Navigation'));
const AppRoutes = lazy(() => import('./routes/routes'));

function App() {
  const location = useLocation();
  const hideNavigationAndFooter = ['/register', '/login'].includes(location.pathname);
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        {!hideNavigationAndFooter && (
          <header>
            <Navigation />
          </header>
        )}
        <main className="flex-grow bg-[#F0F4F9]">
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