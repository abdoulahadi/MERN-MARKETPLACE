/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { createProductDataService } from "../services/product.service";
// import { useParams } from "react-router-dom";

export class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      idVendeur: window.location.href.split("/")[4],
    };
  }
  getShopByUser() {
    const productDataService = createProductDataService();
    productDataService
      .findByVendeur(this.state.idVendeur)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.getShopByUser();
  }
  qs = $item => {
    return document.querySelector($item);
  };
  hidePopup = () => {
    this.qs(".modal").style.display = "none";
  };
  preview = (name,image,description) => {
    this.qs(".modal").style.display = "block";
    this.qs("#path-description").innerHTML = description
    this.qs("#path-name").innerHTML = name
    this.qs("#img-preview").src ="http://localhost:8080/"+ image;
    // e.target.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].getAttribute(
    //   "src"
    // );
  };
  // const qs = ($item)=>{ return document.querySelector($item) }
  // const {id} = useParams();
  // const data = [];

  // fetch(`http://localhost:8080/product/${id}`)
  //   .then(res => res.json())
  //   .then(res => { data = res} )
  //   .catch(err => err);

  render() {
    return (
      <div className="">
        <div className="modal">
          <div className="modal-item pad-20 bg-white">
            <button
              id="btn-modal-hidden"
              className="font bold"
              onClick={this.hidePopup}>
              {" "}
              X{" "}
            </button>
            <div className="x-large col gap-20 pad-20">
              <div className="col-ctr gap-20">
              <span className="clr-black" id="path-name">
                  {" "}
                  {" "}
                </span>
                <span className="clr-gray" id="path-description">
                  {" "}
                  {" "}
                </span>
                <img
                  src={""}
                  alt="Home icon"
                  width="260px"
                  id="img-preview"
                  height="180px"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray pad-20 large">
          <span className="x-font clr-bleue marge row"> shop's name </span>
        </div>
        {/*  ******************************** ARTICLES ***************************************/}
        <div className="row-md pad-20 large">
          {this.state.data.map(row => (
            <div className="" key={row.id}>
              <img
                src={"http://localhost:8080/" + row.image}
                alt="Home icon"
                width="240px"
                height="160px"
              />
              <div className="hashtag row-sb-md">
                <div className="col">
                  <span className="clr-white"> {row.name} </span>
                  <span className="sml-font clr-white">
                    {" "}
                    {"$ " + row.price}{" "}
                  </span>
                </div>
                <div className="row">
                <div className="row">
                    <button onClick={() =>this.preview(row.name, row.image,row.description)} > <img src="../img/icons8-eye-24.png" title="preview" alt="Home icon" width="24px" height="24px"/> </button>
                    <button onClick={()=>this.props.addTocart(row.id)} > <img src="../img/icons8-shopping-cart-24.png" title="preview" alt="Home icon" width="24px" height="24px"/> </button>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
