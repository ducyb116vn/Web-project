
import Navbar from './Navbar'; 
import Hero from './Hero';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans">
      
      <Navbar />

      <main>
        
        <Hero />
        <Dashboard />

      </main>
    </div>
  )
}

export default App;