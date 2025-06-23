import './App.css';
import Home from './pages/Home';
import bgImage from './assests/bg.jpg';


function App() {
  return (
    <div className="App"
    style={{
      backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
    }}>
        <Home/>
    </div>
  );
}

export default App;
