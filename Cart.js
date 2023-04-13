import React, { Component } from "react";

class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products: []
      };
      this.addToCart = this.addToCart.bind(this);
    }
  
    addToCart(product) {
      this.setState({
        products: [...this.state.products, product]
      });
    }
  
    render() {
        return (
          <div className="cart">
            <h2>Cart</h2>
            {this.state.products.map((product, index) => (
              <div className="cart-item" key={index}>
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }
  }
  

export default Cart