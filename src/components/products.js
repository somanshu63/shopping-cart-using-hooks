import React from "react";
import data from "../data.json";
var products;
var product2;
var selectedsize;

function Products(props) {
  products = data.products.filter((product) => {
    if (props.filter.length === 0) {
      return product;
    }
    for (let i = 0; i < props.filter.length; i++) {
      if (product.availableSizes.includes(props.filter[i])) {
        return product;
      }
    }
  });
  return (
    <div className="flex product-list width-70 margin-1">
      {products.map((product, i) => {
        return <Product product={product} this={props} key={i} i={i} />;
      })}
    </div>
  );
}

function Product(props) {
  var sizes = props.product.availableSizes.join(" ");
  var image1 = `/static/products/${props.product.sku}_1.jpg`;
  var image2 = `/static/products/${props.product.sku}_2.jpg`;
  var id = `image${props.i}`;
  return (
    <div className="product-item width-200 margin-1">
      <figure>
        <img
          className="width-100p"
          id={id}
          src={image1}
          alt={props.product.title}
        ></img>
      </figure>
      <button
        id={props.i}
        className="nobtn left-arrow arrow inline-block"
        onClick={(event) => {
          props.this.handleClick(event.target.id, image1);
        }}
      >
        <i id={props.i} className="fa-solid fa-angle-left"></i>
      </button>
      <button
        className="nobtn right-arrow arrow inline-block"
        id={props.i}
        onClick={(event) => {
          props.this.handleClick(event.target.id, image2);
        }}
      >
        <i id={props.i} className="fa-solid fa-angle-right"></i>
      </button>
      <div className="product-details padding-1">
        <h3 className="fs-20 pink text-cap margin-5px">
          {props.product.title}
        </h3>
        {props.product.isFreeShipping ? (
          <span className="fs-14 shipping text-center">Free Shipping</span>
        ) : (
          ""
        )}
        <span className="fs-16 price black">
          {props.product.currencyFormat} {props.product.price}
        </span>
        <p className="fs-14 size margin-5px">{sizes}</p>
        <span>{props.product.isFreeShipping}</span>
        <div className="select-size none">
          <h4 className="fs-18 text-cap">select size</h4>
          <div className="flex justify-center">
            {props.product.availableSizes.map((size) => {
              return (
                <button
                  key={size}
                  id={props.i}
                  onClick={(event) => {
                    selectedsize = size;
                    product2 = {
                      title: props.product.title,
                      image: `/static/products/${props.product.sku}_1.jpg`,
                      size: selectedsize,
                      price: props.product.price,
                    };
                    props.this.addToCart(product2);
                    var select =
                      document.getElementsByClassName("select-size")[
                        event.target.id
                      ];
                    select.classList.add("none");
                  }}
                  className="size-item nobtn white"
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        <button
          id={props.i}
          onClick={(event) => {
            var select =
              document.getElementsByClassName("select-size")[event.target.id];
            select.classList.remove("none");
          }}
          className="btn"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Products;
