import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

const root = document.getElementById("root");
if (root === null) throw new Error("main.tsx: root element not found.");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
