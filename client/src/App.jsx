import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesktopPage from './pages/Desktop/Desktop';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DesktopPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
