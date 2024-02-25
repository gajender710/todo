import React from "react";
import Home from "./pages/home";
import TodoList from "./pages/todo";
import { AppProvider } from "./context/app-context";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
