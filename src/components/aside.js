import React from "react";
import data from "../data.json";

function Aside(props) {
  var sizes = [];
  data.products.map((product, i) => {
    return product.availableSizes.forEach((size) => {
      if (!sizes.includes(size)) {
        sizes.push(size);
      }
    });
  });
  return (
    <aside className="width-20 ">
      <div
        onClick={() => {
          var cart = document.getElementsByClassName("cart")[0];
          cart.classList.remove("none");
        }}
        className="cart-icon "
      >
        <button className="nobtn cart-icon-btn fs-32 padding-1 pink">
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
      <Cart
        cart={props.cart}
        size={props.size}
        decreaseQuantity={props.decreaseQuantity}
        increaseQuantity={props.increaseQuantity}
        handleDelete={props.handleDelete}
      />
      <h2 className="fs-20 margin-1 size-heading">Sizes:</h2>
      <div className="filterSize-list margin-1 flex">
        {sizes.map((size) => {
          return (
            <button
              key={size}
              id={size}
              onClick={(event) => {
                props.handleSearch(event.target.id);
              }}
              className={
                props.size.includes(size)
                  ? "size-item nobtn white active"
                  : "size-item nobtn white"
              }
            >
              {size}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function Cart(props) {
  return (
    <div className="cart none padding-1">
      <button
        onClick={(event) => {
          event.target.parentElement.classList.add("none");
        }}
        className="cart-btn nobtn fs-20 white padding-1"
      >
        x
      </button>
      <h3 className="pink text-cap margin-1 text-center fs-40">
        Cart <i className="pink fa-solid fa-cart-shopping"></i>
      </h3>
      <hr></hr>
      <div className="cart-products">
        {props.cart.map((product, i) => {
          return (
            <div
              key={i}
              className="cart-product-item justify-space-between padding-1-0 flex align-center"
            >
              <div className="flex align-center">
                <figure>
                  <img src={product.image} alt={product.title}></img>
                </figure>
                <div className="cart-product-details">
                  <h4 className="fs-18 padding-5px pink">{product.title}</h4>
                  <span className="fs-16 padding-5px blue">
                    size: {product.size}
                  </span>
                  <span className="fs-16 padding-5px blue">
                    quantity: {product.quantity}
                  </span>
                </div>
              </div>
              <div>
                <button
                  id={i}
                  onClick={() => {
                    props.handleDelete(i);
                  }}
                  className="cross-product nobtn fs-18 padding-5px white"
                >
                  x
                </button>
                <br></br>
                <p className="fs-18 pink rates padding-5px">
                  ${product.price * product.quantity}
                </p>
                <button
                  id={i}
                  onClick={() => {
                    props.decreaseQuantity(i);
                  }}
                  className="fs-20 nobtn quantity-update white padding-5px"
                >
                  -
                </button>
                <button
                  id={i}
                  onClick={() => {
                    props.increaseQuantity(i);
                  }}
                  className="fs-20 nobtn quantity-update white padding-5px"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout">
        <hr></hr>
        <div className="flex align-center justify-space-between">
          <h4 className="fs-18 pink text-cap padding-1">total</h4>
          <span className="fs-20 padding-1 pink">
            $
            {String(
              props.cart
                .map((product) => product.price * product.quantity)
                .reduce((cv, acc, i) => {
                  acc = acc + cv;
                  return acc;
                }, 0)
            ).substring(0, 6)}
          </span>
        </div>
        <button className="fs-24 nobtn padding-1 margin-1 checkout-btn text-cap pink">
          checkout
        </button>
      </div>
    </div>
  );
}

export default Aside;
