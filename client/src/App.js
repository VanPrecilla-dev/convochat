import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/HomePage";
import './App.css'



import AppContext from "./context/AppContext";
import ConvoChatPage from "./pages/ConvoChatPage";

function App({ children }) {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<div>Not Found Page</div>}>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<ConvoChatPage />} />
      </Route>
    )
  );

  return (
    <AppContext>
      <RouterProvider router={router}>{children}</RouterProvider>{" "}
    </AppContext>
  );
}

export default App;
