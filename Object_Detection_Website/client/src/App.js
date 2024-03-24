import react from "react"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import Navigation from "./components/Navigation";
import About from './pages/About';
import Home from "./pages/Home"
import Contact from "./pages/Contact";

function App(){
    return(
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" exact element={<MainComponent/>} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;