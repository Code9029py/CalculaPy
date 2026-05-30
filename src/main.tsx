import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/global.css";

function App() {
  return (
    <main className="app-shell">
      <h1>CalculaPy</h1>
      <p>Calculadoras utiles y orientativas para Paraguay.</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
