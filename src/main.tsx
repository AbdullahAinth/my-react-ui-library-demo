import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ✅ Import ThemeProvider from styled-components
import { ThemeProvider } from "styled-components";

// ✅ Standard import for theme from your UI library
// This relies on npm link and ui-library's package.json to resolve the 'ui-library' package,
// and then finds the 'theme' export within its main bundle.
import { theme } from "ui-library"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* <GlobalStyle /> */}
      <App />
    </ThemeProvider>
  </StrictMode>
);