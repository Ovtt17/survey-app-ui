import Navigation from "./components/navigation/Navigation"

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navigation />
      </header>
      <main className="flex-grow p-4">
        <div>
          Hola, soy main
        </div>
      </main>
      <footer className="bg-gray-800 p-4">

      </footer>
    </div>
  )
}

export default App
