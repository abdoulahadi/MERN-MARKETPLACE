import React, { Component } from "react";
import { createProductDataService } from "../services/product.service";
import { createCategoryDataService } from "../services/category.service";

import Loader from "./Loader";
import { createVendeurDataService } from "../services/vendeur.service";

export class Panel extends Component {
  constructor(props) {
    super(props);
    this.qs = this.qs.bind(this);
    this.qsa = this.qsa.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.getPathProfile = this.getPathProfile.bind(this);
    this.submitAddProduct = this.submitAddProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.deleteShop = this.deleteShop.bind(this)

    this.state = {
      data: [],
      idVendeur: window.location.href.split("/")[4],
      categories:[],
      isdelete : false,
      isloading :true
    };
  }
  qs = $item => {
    return document.querySelector($item);
  };
  qsa = $item => {
    return document.querySelectorAll($item);
  };
  // const {id} = useParams();
  // alert(id);

  // fetch(`http://localhost:8080/product/${id}`)
  //   .then(res => res.json())
  //   .then(res => { data = res} )
  //   .catch(err => err);
  getShopByUser() {
    const productDataService = createProductDataService();
    productDataService
      .findByVendeur(this.state.idVendeur)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        
        console.error(err);
        this.setState({
          isdelete:true,
          data: []
      })
      });
  }

  componentDidMount() {
    this.setState({
      isloading:true
    })
    this.getShopByUser();
    this.retrieveCategories();
  }
  retrieveCategories() {
    const categoryDataService = createCategoryDataService();
    categoryDataService
      .getAllCategories()
      .then(response => {
        this.setState({
          categories: response.data,
          isloading:false
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({
          isloading:false
        })
      });
  }
  submitAddProduct(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    // const idVendeur = window.location.href.split("/")[4];
    formData.append("vendeur", this.state.idVendeur);
    const productDataService = createProductDataService("multipart/form-data");
    this.setState({
      isloading:true
    })
    productDataService
      .create(formData)
      .then(data => {
        this.getShopByUser();
        console.log(data);
        this.qs(".modal")[0].style.display = "none";
        form.reset();
        this.setState({
          isloading:false
        })
      })
      .catch(error => {
        console.error(error);
        this.setState({
          isloading:false
        })
      });

    // console.log(this.state.user);
  }

  handleDeleteProduct(productId) {
    const productDataService = createProductDataService();
    this.setState({
      isloading:true
    })
    productDataService
      .delete(productId)
      .then(() => {
        // remove product from state by filtering out the deleted product
        this.setState(prevState => ({
          data: prevState.data.filter(product => product.id !== productId),
        }));
        this.getShopByUser();
        this.setState({
          isloading:false
        })
      })
      .catch(error => {
        console.error(error);
      });
  }
deleteShop(){
  const vendeurDataService = createVendeurDataService();
  this.setState({
    isloading:true
  })
  vendeurDataService.delete(window.location.href.split("/")[4])
  .then((res)=>{
    this.setState({
      isdelete:true,
      isloading:false
    })
    this.hidePopup();
    this.getShopByUser();
    this.retrieveCategories();
  })
}
  addProduct = () => {
    this.qsa(".modal")[0].style.display = "block";
  };

  hideModal = () => {
    this.qsa(".modal")[0].style.display = "none";
  };

  delshop = () => {
    this.qsa(".modal")[1].style.display = "block";
  };

  hidePopup = () => {
    this.qsa(".modal")[1].style.display = "none";
  };

  getPathProfile = () => {
    this.qs("#path-img").innerText = this.qs("#photo-modal").value;
  };

  render() {
    return (
      <div className="">
        {this.state.isloading && <Loader />}
        {/* ******************************* Modal ********************************* */}
        <div className="modal">
          <div className="modal-item pad-20 bg-white col-ctr">
            <button
              id="btn-modal-hidden"
              className="font bold"
              onClick={this.hideModal}>
              {" "}
              X{" "}
            </button>
            <fieldset className="border">
              <legend className="font clr-gray"> New product </legend>
              <div className="x-large col gap-20">
                <form onSubmit={this.submitAddProduct}>
                  <div className="col">
                    <div className="row-ctr gap-20">
                      <label
                        htmlFor="photo-modal"
                        id="add-img"
                        className="pad-10 row-ctr marge-top-10"
                        onChange={this.getPathProfile}>
                        <img src="../img/icons8-camera-30.png" alt="" />
                        <input type="file" name="image" id="photo-modal" />
                      </label>
                      <span className="clr-gray sml-font" id="path-img">
                        {" "}
                      </span>
                    </div>
                    <div className="inputs marge-top-10">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="input"
                        placeholder="name"
                        required
                      />
                    </div>
                    <div className="inputs marge-top-10">
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="input"
                        placeholder="price"
                        required
                      />
                    </div>
                    <div className="inputs marge-top-10">
                      <select name="category" id="category">
                      <option value="">-- Sélectionner une catégorie --</option>
                    {this.state.categories.map(category => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                      </select>
                    </div>
                    <textarea
                      name="description"
                      id="description"
                      cols="30"
                      rows="5"
                      className="border marge-top-10"
                      placeholder="Description"></textarea>
                  </div>
                  <input
                    type="submit"
                    id="btn-submit-add-product"
                    onClick={this.hideModal}
                    className="link-submit font bold clr-white marge-top-10"
                    value="Save"
                  />
                </form>
              </div>
            </fieldset>
          </div>
        </div>

        {/* ******************************* Modal ********************************* */}

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
                <span className="clr-gray font" id="path-img">
                  {" "}
                  Would you really delete your shop{" "}
                </span>
                <div className="col">
                  <input
                    type="submit"
                    id="btn-submit-add-product"
                    onClick={this.deleteShop}
                    className="link-submit bold clr-white marge-top-10"
                    value="YES"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ******************************* PALETTE ********************************* */}
        {!this.state.isdelete &&
        <div className="palette col bg-white border">
          <button id="add-product-btn" onClick={this.addProduct}>
            {" "}
            <img
              src="../img/icons8-add-new-50.png"
              alt="Home icon"
              title="add product"
              width="24px"
              height="24px"
            />{" "}
          </button>
          <a href="/">
            {" "}
            <img
              src="../img/icons8-settings-50.png"
              alt="Home icon"
              title="accounting"
              width="24px"
              height="24px"
            />{" "}
          </a>
          <button id="add-product-btn" onClick={this.delshop}>
            {" "}
            <img
              src="../img/icons-delete-trash-48.png"
              alt="Home icon"
              title="delete shop"
              width="24px"
              height="24px"
            />{" "}
          </button>
          <a href="/my-shop" className="">
            {" "}
            <img
              src="../img/icons8-go-back-30.png"
              alt="Home icon"
              title="back"
              width="24px"
              height="24px"
            />{" "}
          </a>
        </div>
         }
        <div className="bg-gray pad-20 large">
{!this.state.isdelete && <span className="x-font clr-bleue marge row">
            {" "}
            All my shop's product{" "}
          </span>}
          
        {this.state.isdelete && <a href="/my-shop" className="link-submit clr-white pad-20 large">
            {" "}Créer un boutique {" "}
          </a>}
        </div>
         
        {/*  ******************************** ARTICLES ***************************************/}
        <div className="row-md pad-20 large">
          {this.state.data.map(row => (
            <div className="">
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
                  <a href={"/modify-product/" + row.id}>
                    {" "}
                    <img
                      src="../img/icons8-eye-24.png"
                      title="modify"
                      alt="Home icon"
                      width="24px"
                      height="24px"
                    />{" "}
                  </a>{" "}
                  <img
                    src="../img/icons8-delete-trash-48.png"
                    title="delete"
                    alt="Home icon"
                    width="24px"
                    height="24px"
                    onClick={() => this.handleDeleteProduct(row.id)}
                    style={{ cursor: "pointer" }}
                  />{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
