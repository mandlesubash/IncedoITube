import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ITube from './iTube_Frontend';
import Upload from './iTube_Upload';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ITube />} />
          <Route path="/upload" element={<Upload/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
