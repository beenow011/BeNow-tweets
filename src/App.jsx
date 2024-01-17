import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
// import bg from "./assets/bh";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SideBar } from "./components/Header/SideBar";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-[url('../assets/bg.jpg')] shadow-md  shadow-black md:ring-2 rounded-md md:ring-white/10">
        <Header />
        <SideBar />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
