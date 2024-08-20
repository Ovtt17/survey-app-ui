import Navigation from "./components/navigation/Navigation";
import AppRoutes from './routes/routes';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
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
  );
}

export default App;