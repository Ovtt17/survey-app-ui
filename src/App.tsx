import Navigation from "./components/navigation/Navigation";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from './routes/routes';
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <ScrollToTop />
        <header>
          <Navigation />
        </header>
        <main className="flex-grow p-4">
          <AppRoutes />
        </main>
        <footer className="bg-gray-800 p-4">
          {/* Aquí puedes agregar el contenido del pie de página */}
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;