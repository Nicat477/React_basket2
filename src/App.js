import React, { createContext, useState } from "react";
import "./styles.css";
import { Route } from "react-router-dom";

import Products from "./components/Products";
import Cart from "./components/Cart";

import { data } from "./data";
export const BooksContext = createContext();
export default function App() {
  const [state, setstate] = useState({
    booklist: data,
    cart: []
  });
  const addtocart = (book) =>
    setstate({
      ...state,
      cart: state.cart.find((cartitem) => cartitem.id === book.id)
        ? state.cart.map((cartitem) =>
            cartitem.id === book.id
              ? { ...cartitem, count: cartitem.count + 1 }
              : cartitem
          )
        : [...state.cart, { ...book, count: 1 }]
    });
  const increase = (id) => {
    setstate({
      ...state,
      cart: state.cart.map((cartitem) =>
        cartitem.id === id
          ? { ...cartitem, count: cartitem.count + 1 }
          : cartitem
      )
    });
  };
  const decrease = (id) => {
    setstate({
      ...state,
      cart: state.cart.map((cartitem) =>
        cartitem.id === id
          ? { ...cartitem, count: cartitem.count > 1 ? cartitem.count - 1 : 1 }
          : cartitem
      )
    });
  };
  const removeitem = (id) => {
    setstate({
      ...state,
      cart: state.cart.filter((cartitem) => cartitem.id !== id)
    });
  };
  return (
    <BooksContext.Provider
      value={{ state: state, addtocart, increase, decrease, removeitem }}
    >
      <div className="App">
        <h1>
          Alışveriş Sepeti Yapımı
          <img
            src="https://avatars3.githubusercontent.com/u/60869810?v=4"
            alt="React Dersleri"
          />{" "}
          React Dersleri
        </h1>
        <Route exact path="/" component={Products} />
        <Route path="/cart" component={Cart} />
      </div>
    </BooksContext.Provider>
  );
}
