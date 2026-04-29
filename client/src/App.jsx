import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Desktop from './shell/Desktop/Desktop';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
