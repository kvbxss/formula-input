import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import FormulaInput from "./FormulaInput.tsx";
import "./global.css";
import { Providers } from "./providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <FormulaInput />
    </Providers>
  </StrictMode>
);
