/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { createProductDataService } from "../services/product.service";
import { createCategoryDataService } from "../services/category.service";
// import { createCommandeDataService } from "../services/commande.service";
import moment from "moment";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.retrieveLastProducts = this.retrieveLastProducts.bind(this);
    this.getProductByCategory = this.getProductByCategory.bind(this);
    this.getProductBySearch = this.getProductBySearch.bind(this);
    this.handleaddToCart = this.handleaddToCart.bind(this);
    this.qs = this.qs.bind(this);
    this.hidePopup = this.hidePopup.bind(this)
    this.preview = this.preview.bind(this)

    this.state = {
      latestProduct: [],
      searchProduct: [],
      allProduct: [],
      categories: [],
      randomCategories: [],
      selectCategories: [],
      loading: true,
      loadingSearch: false,
      loadingLastest:true
    };
  }
  qs = $item => {
    return document.querySelector($item);
  };
  componentDidMount() {
    this.retrieveProducts();
    this.retrieveLastProducts();
    this.retrieveCategories();
  }

  retrieveProducts() {
    const productDataService = createProductDataService();
    productDataService
      .getAll()
      .then(response => {
        this.setState({
          allProduct: response.data,
          loading: false,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveCategories() {
    const categoryDataService = createCategoryDataService();
    categoryDataService
      .getAllCategories()
      .then(response => {
        const random = response.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 3); // Choix de 3 catégories au hasard
        const select = response.data.filter(
          category => !random.includes(category)
        );
        this.setState({
          categories: response.data,
          randomCategories: random,
          selectCategories: select,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  retrieveLastProducts() {
    const productDataService = createProductDataService();
    this.setState({
      loadingLastest:true
    })
    productDataService
      .getNewProduct()
      .then(response => {
        this.setState({
          latestProduct: response.data,
          loadingLastest:false
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
async handleaddToCart(idProduit){
  await this.props.addTocart(idProduit)
}
  //  getLatestProduct() {
  //   fetch( "http://localhost:9000/latestProduct/" )
  //     .then(res => res.json())
  //     .then(res => this.setState({ latestProduct : res }))
  //     .catch(err => err);
  // }
  getProductBySearch(event) {
    const name = event.target.value;
    if (name !== "") {
      this.setState({
        loadingSearch: true,
      });
      const category = this.qs("#search_category").value;
      const productDataService = createProductDataService();
      productDataService
        .findByName(name, category)
        .then(res =>
          this.setState({ searchProduct: res.data, loadingSearch: false })
        )
        .catch(err => err);
    }
    this.setState({
      searchProduct: [],
    });
  }
  getProductByCategory(category) {
    this.setState({
      loading: true,
    });
    const productDataService = createProductDataService();
    productDataService
      .findByCategory(category)
      .then(res => this.setState({ allProduct: res.data, loading: false }))
      .catch(err => err);
  }
  //  getProductBySerch() {
  //   fetch("http://localhost:9000/productBySearch")
  //     .then(res => res.json())
  //     .then(res => this.setState({ latestProduct : res }))
  //     .catch(err => err);
  // }

  // componentDidMount() {
  //   this.getLatestProduct();
  //  this.getProductByCategory();
  // }
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
  render() {
    return (
      <div>
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
        <div className="x-row pad-20 gap-20">
          {/*  ******************************** RIGHT BOX ***************************************/}
          <div className="large-7 col">
            {/* ******************************** FIRST ITEM OF RIGHT BOX ***************************************/}
            <div className="x-large col shadow">
              {/* ******************************** SEARCH BAR ***************************************/}
              <div className="row bg-gray pad-20 x-large">
                <div className="col">
                  <span className="sml-font clr-gray"> Select category </span>
                  <select className="select" id="search_category">
                    <option value="">-- Sélectionner une catégorie --</option>
                    {this.state.categories.map(category => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <span className="sml-font clr-gray"> Select product </span>
                  <div className="row">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="search-field"
                      placeholder="product"
                      onChange={this.getProductBySearch}
                    />
                    <button type="submit" className="search-btn row-ctr">
                      <img
                        src="./img/icons8-search-50.png"
                        alt="Home icon"
                        width="24px"
                        height="24px"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/********************************* ARTICLES ***************************************/}

              <div className="row-md pad-20 x-large">
                {this.state.loadingSearch ? (
                  <span className="sr-only">Loading...</span>
                ) : (
                  this.state.searchProduct.map(row => (
                    <div key={row.id}>
                      <img
                        src={"http://localhost:8080/" + row.image}
                        alt="Home icon"
                        width="260px"
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
                        <button  onClick={() => this.handleaddToCart(row.id)}>
                          {" "}
                          <img
                            src="./img/icons8-shopping-cart-24.png"
                            alt="Home icon"
                            width="24px"
                            height="24px"
                          />{" "}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/********************************* SECOND ITEM OF RIGHT BOX ***************************************/}
            <div className="x-large col shadow marge-top-10">
              <div className="col bg-gray gap-10 x-large">
                <span className="font clr-bleue bold marge">
                  {" "}
                  Explore by category{" "}
                </span>
                <div className="row">
                  <select
                    className="btn-explore"
                    onChange={event =>
                      this.getProductByCategory(event.target.value)
                    }>
                    <option value="">-- Sélectionner une catégorie --</option>
                    {this.state.selectCategories.map(category => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </select>
                  {this.state.randomCategories.map(category => (
                    <button
                      key={category.name}
                      className="btn-explore"
                      onClick={() => this.getProductByCategory(category.name)}>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="row-md pad-20">
                {this.state.loading ? (
                  <span className="sr-only">Loading...</span>
                ) : this.state.allProduct.length === 0 ? (
                  <span className="sr-only">Aucun produit</span>
                ) : (
                  this.state.allProduct.map(row => (
                    <div className="" key={row.id}>
                      <img
                        src={"http://localhost:8080/" + row.image}
                        alt="Home icon"
                        width="260px"
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
                        <button  onClick={() => this.handleaddToCart(row.id)}>
                          {" "}
                          <img
                            src="./img/icons8-shopping-cart-24.png"
                            alt="Home icon"
                            width="24px"
                            height="24px"
                          />{" "}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {/********************************* LEFT BOX ***************************************/}
          <div className="large-3 bg-gray col pad-30 shadow">
            <div className="row">
              <span className="font clr-bleue bold"> Latest Products </span>
            </div>
            <div className="large-3 col-md">
              {/********************************* ITEMS OF LEFT BOX ***************************************/}

              {this.state.loadingLastest ? (
                <span className="sr-only">Loading...</span>
              ) : (
                this.state.latestProduct.map(row => (
                  <div className="latest-item row-ctr pad-5" key={row.id}>
                    <img
                      src={"http://localhost:8080/" + row.image}
                      alt="Home icon"
                      width="100px"
                      height="120px"
                    />
                    <div className="col pad-10 x-large">
                      <span className="clr-bleue bold row"> {row.name} </span>
                      <div className="x-large row">
                        <img
                          src="./img/icons8-shopping-cart-24.png"
                          alt="Home icon"
                          width="24px"
                          height="24px"
                        />
                        <span className="clr-bleue"> {row.vendeur.name}</span>
                      </div>
                      <span className="sml-font clr-bleue x-large row">
                        {" "}
                        {"added on " + moment(row.createdAt).format("MMMM Do YYYY")}{" "}
                      </span>
                      <div className="row-sb x-large">
                        <span className="clr-bleue"> {"$ " + row.price} </span>
                        <div className="row">
                          
                          <button  onClick={() => this.preview(row.name,row.image,row.description)}>
                          {" "}
                          <img
                            src="./img/icons8-eye-24.png"
                            alt="Home icon"
                            width="24px"
                            height="24px"
                          />{" "}
                        </button>
                          <button  onClick={() => this.handleaddToCart(row.id)}>
                          {" "}
                          <img
                            src="./img/icons8-shopping-cart-24.png"
                            alt="Home icon"
                            width="24px"
                            height="24px"
                          />{" "}
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
