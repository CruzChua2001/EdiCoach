import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/Home/App";

const root = createRoot(document.getElementById("container"));
root.render(<App />);
