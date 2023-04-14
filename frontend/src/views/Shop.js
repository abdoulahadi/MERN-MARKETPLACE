/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { createProductDataService } from "../services/product.service";
import { createVendeurDataService } from "../services/vendeur.service";
// import { useParams } from "react-router-dom";

export class Shop extends Component {
  constructor(props) {
    super(props);
    this.getShopByUser = this.getShopByUser.bind(this);
    this.getVendeurById = this.getVendeurById.bind(this);

    this.state = {
      data: [],
      idVendeur: window.location.href.split("/")[4],
      nameBoutique:"",
      descriptionBoutique:""
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
  getVendeurById(){
    const vendeurDataService = createVendeurDataService();
    vendeurDataService.get(this.state.idVendeur)
    .then((res)=>{
      this.setState({
          nameBoutique : res.data.name,
          descriptionBoutique:res.data.description
      })
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  componentDidMount() {
    this.getShopByUser();
    this.getVendeurById();
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
           <h1 className="x-font clr-bleue marge row"> {this.state.nameBoutique} </h1>
           <span>{this.state.descriptionBoutique}</span>
        </div>
        {/*  ******************************** ARTICLES ***************************************/}
        <div className="product-list">
          { this.state.data.length > 0 ?
          this.state.data.map(row => (
            <div className="product" key={row.id}>
              <img
                src={"http://localhost:8080/" + row.image}
                alt={row.name}
                width="240px"
                height="160px"
              />
               <h3>{row.name}</h3>
               <p className="price">{row.price} $</p>
               <p className="description">{row.description}</p>
               <button className="btn" onClick={() => this.props.addTocart(row.id)}>Add to Cart</button>
            </div>
          ))
        :<span>Ce Boutique est vide</span>
        }
        </div>
      </div>
    );
  }
}
