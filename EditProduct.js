//import match from 'react-dom';
import React, { Component } from "react";

class EditProduct extends Component {
  state = {
    id: "",
    name: "",
    price: "",
    quantity: "",
    description: "",
  };

  componentDidMount() {
    // récupérer l'id du produit à partir de l'URL
    const id = this.props.match.params.id ? this.props.match.params.id : '';
    // récupérer le produit correspondant à partir de la liste des produits
    const product = this.props.products.find((p) => p.id === id);

    // pré-remplir le formulaire avec les informations du produit sélectionné
    this.setState({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // appeler la fonction de mise à jour des produits pour mettre à jour le produit sélectionné
    this.props.updateProduct(this.state);
    // rediriger vers la page d'affichage des produits
    this.props.history.push("/products");
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div className="submit-form">
        <h4>Edit Product</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Id</label>
            <input
              type="text"
              className="form-control"
              id="id"
              value={this.state.id}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={this.state.price}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default EditProduct;
