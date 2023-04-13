import React, { Component } from "react";
import "./AddProduct.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  state = {
    name: "",
    price: "",
    quantity: "",
    image: null,
    description: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file);
      this.setState({ image: file });
    } else {
      console.log("No file selected");
      this.setState({ image: null });
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.addProduct(this.state);
    this.setState({
      name: "",
      price: "",
      quantity: "",
      image: null,
      description: ""
    });
  }

  render() {
    const { name, price, quantity, image, description } = this.state;

    return (
      <div className="add-product">
        <h4>Add Product</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group flex-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              name="image"
              onChange={this.handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
              required
            ></textarea>
          </div>
          <button className="btn" type="submit">
            Add Product
          </button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
