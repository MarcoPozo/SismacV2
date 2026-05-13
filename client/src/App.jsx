import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Desktop from "./shell/Desktop/Desktop";
import Splash from "./shell/Splash/Splash";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}
      <Routes>
        <Route path="/*" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
