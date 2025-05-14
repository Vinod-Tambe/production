import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HrRouter from "./hr/routers/HrRouter";
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HrRouter />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
