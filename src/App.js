import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import CardProduct from "./components/CardProduct";
import ProductDetails from "./components/ProductDetails";
const App = () => {
  return (
    <>
      {/* <div className="container"> */}
      <Header />
      <Routes>
        <Route path="/" element={<CardProduct />} />
        <Route path="/cart/:id" element={<ProductDetails />} />
      </Routes>
      {/* </div> */}
    </>
  );
};

export default App;
