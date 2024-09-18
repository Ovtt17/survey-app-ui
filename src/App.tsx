import { useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from './routes/routes';
import ScrollToTop from "./utils/ScrollToTop";

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