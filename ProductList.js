import React, { Component } from "react";
import "./ProductList.css";
import AddProduct from "./AddProduct";

class ProductList extends Component {
  state = {
    products: [
      { id: 1, name: "Product 1", price: 150000.0, quantity: 5, image: "1.jpg", description: "Description of product 1" },
      { id: 2, name: "Product 2", price: 200000.0, quantity: 3, image: "2.jpg", description: "Description of product 2" },
      { id: 3, name: "Product 3", price: 100000.0, quantity: 8, image: "3.jpg", description: "Description of product 3" }
    ]
  };

  addProduct = product => {
    const { products } = this.state;
    const newProduct = { id: products.length + 1, ...product };
    this.setState({ products: [...products, newProduct] });
  };

  render() {
    const { products } = this.state;

    return (
      <div>
        <AddProduct addProduct={this.addProduct} />
        
        <div className="product-list">
          <h4>Product List</h4>
        
          {products.map(product => (
            <div className="product" key={product.id}>
              <img src={`${process.env.PUBLIC_URL}/images/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price} FCFA</p>
              <p className="quantity">Qty: {product.quantity}</p>
              <p className="description">{product.description}</p>
              <button className="btn" onClick={() => this.props.addToCart(this.props.product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
