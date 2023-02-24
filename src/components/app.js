import React from "react";
import Aside from "./aside";
import Products from "./products";
import { useState, useEffect } from "react";

function App() {
  const [size, setSize] = useState([]);
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   if (localStorage.cart) {
  //     setCart(JSON.parse(localStorage.cart) || []);
  //   }
  //   handleLocalStorage();
  // }, [cart]);

  let handleLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  let handleClick = (value, image) => {
    var imageD = document.getElementById(`image${value}`);
    imageD.src = image;
  };
  let handleSearch = (value) => {
    if (size.includes(value)) {
      setSize(size.filter((i) => i !== value));
    } else {
      setSize([...size, value]);
    }
  };
  let addToCart = (products) => {
    products.quantity = 1;
    if (
      cart.find(
        (product) =>
          product.title === products.title && product.size === products.size
      )
    ) {
      let cartNew = cart.map((product) => {
        if (
          product.title === products.title &&
          product.size === products.size
        ) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCart(cartNew);
    } else {
      setCart([...cart, products]);
    }
  };
  let decreaseQuantity = (index) => {
    if (cart[index].quantity > 1) {
      var increasedProducts = cart.map((product, i) => {
        if (i === index) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCart(increasedProducts);
    } else if (cart[index].quantity === 1) {
      handleDelete(index);
    }
  };
  let increaseQuantity = (index) => {
    var increasedProducts = cart.map((product, i) => {
      if (i === index) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(increasedProducts);
  };
  let handleDelete = (index) => {
    setCart(cart.filter((product, i) => i !== index));
  };
  return (
    <>
      <h1 className="text-center fs-28 pink margin-2">Products</h1>
      <div className="flex">
        <Products
          handleClick={handleClick}
          filter={size}
          addToCart={addToCart}
        />
        <Aside
          handleSearch={handleSearch}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          cart={cart}
          size={size}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
