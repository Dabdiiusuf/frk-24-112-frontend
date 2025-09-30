import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ConfigContextProvider } from "./providers/ConfigContext.jsx";
import { ApiContextProvider } from "./providers/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <ConfigContextProvider>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </ConfigContextProvider>
);
