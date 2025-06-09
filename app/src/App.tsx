import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { NavigationBar } from "./components/navbar/NavigationBar";
import { MainContent } from "./components/content/MainContent";
import { App as AntdApp } from "antd";

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  return (
    <AntdApp>
      <BrowserRouter>
        <div className="relative min-h-screen md:flex">
          <NavigationBar setExpand={setSideMenuIsExpand} />
          <div
            className={`flex-1 min-h-screen mx-0 bg-emerald-50 transition-all duration-300 ease-in-out ${
              sideMenuIsExpand ? "md:ml-64" : "md:ml-20"
            }`}
          >
            <MainContent />
          </div>
        </div>
      </BrowserRouter>
    </AntdApp>
  );
}

export default App;
