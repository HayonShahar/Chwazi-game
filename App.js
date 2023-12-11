import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Start from './components/Start';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path="/start" element={<Start/>} />
          <Route path="/" element={<Welcome/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
