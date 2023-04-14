import React, { Component } from "react";
import {createVendeurDataService} from "../services/vendeur.service";
import moment from "moment";

export class Myshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: JSON.parse(sessionStorage.getItem("user")).id,
      myshop: [], // [] array
    };
  }

  getShopByUser() {
    const vendeurDataService = createVendeurDataService();
    vendeurDataService.getAllVendeursByUserId(this.state.idUser)
      .then(res => {
        this.setState({ myshop: res.data });
        console.log(this.state.myshop);
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.getShopByUser();
  }

  submitShop = e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("user", this.state.idUser);
    const vendeurDataServiceMultipart = createVendeurDataService("multipart/form-data");
    vendeurDataServiceMultipart.create(formData)
      .then(data => {
        console.log(data);
        this.qs("#shop-modal").style.display = "none";
        this.componentDidMount()
      })
      .catch(error => console.error(error));

    
    // console.log(this.state.user);
  };

  qs = $item => {
    return document.querySelector($item);
  };

  addShop = () => {
    this.qs("#shop-modal").style.display = "block";
    console.log(this.state.user);
  };

  hideShopModal = () => {
    this.qs("#shop-modal").style.display = "none";
  };

  getPathProfile = () => {
    this.qs("#path-img-shop").innerText = this.qs("#photo-shop").value;
  };

  render() {
    return (
      <div>
        {this.state.myshop.length === 0 ? (
          <button id="btn-new-shop" onClick={this.addShop}>
            {" "}
            New shop{" "}
          </button>
        ) : null}

        {/* ******************************* Modal ********************************* */}
        <div className="modal" id="shop-modal">
          <div className="modal-item pad-20 bg-white col-ctr">
            <button
              id="btn-modal-hidden"
              className="font bold"
              onClick={this.hideShopModal}>
              {" "}
              X{" "}
            </button>
            <fieldset className="border">
              <legend className="font clr-gray"> New shop </legend>
              <form onSubmit={this.submitShop}>
                <div className="x-large col gap-20">
                  <div className="col">
                    <div className="row-ctr gap-20">
                      <label
                        htmlFor="photo-shop"
                        id="add-img"
                        className="pad-10 row-ctr marge-top-10"
                        onChange={this.getPathProfile}>
                        <img src="../img/icons8-camera-30.png" alt="" />
                        <input type="file" name="image" id="photo-shop" />
                      </label>
                      <span className="clr-gray sml-font" id="path-img-shop">
                        {" "}
                      </span>
                    </div>
                    <div className="inputs marge-top-10">
                      <input
                        type="text"
                        name="name"
                        id=""
                        className="input"
                        placeholder="shop's name"
                        required
                      />
                    </div>
                    <textarea
                      name="description"
                      id=""
                      cols="30"
                      rows="5"
                      className="border marge-top-10"
                      placeholder="Description"></textarea>
                  </div>
                  <input
                    type="submit"
                    id="btn-submit-add-product"
                    onClick={this.hideShopModal}
                    className="link-submit font bold clr-white marge-top-10"
                    value="Save"
                  />
                </div>
              </form>
            </fieldset>
          </div>
        </div>

        <div className="large row marge-top-30">
          <img
            src="../img/icons8-user-30.png"
            alt="Home icon"
            width="24px"
            height="24px"
          />
          <span className="clr-gray">
            {" "}
            owner : {JSON.parse(sessionStorage.getItem("user")).username}
          </span>
        </div>
        <div className="large border-btm row">
          <span className="clr-gray"> My shops </span>
        </div>
        {this.state.myshop.length === 0 ? (
          <div className="large pad-20 bg-pink row-ctr">
            <span className="clr-white"> there is no shop currently </span>
          </div>
        ) : (
          this.state.myshop.map((row,index) => (
            <div className="large shadow pad-10 bg-white row-sb-sml" key={index}>
              <div className="x-large row-y-ctr">
                <img
                  src="../img/icons8-shopping-mall-100.png"
                  alt="Home icon"
                  width="50px"
                  height="50px"
                />
                <div className="pad-10 col">
                  <span className="clr-gray">
                    {" "}
                    shop : {row.name} created at :{" "}
                    {moment(row.createdAt).format("MMMM Do YYYY") +
                      " and modify at :" +
                      moment(row.updatedAt).format("MMMM Do YYYY")}{" "}
                  </span>
                  <span className="clr-gray"> {row.description} </span>
                </div>
              </div>
              <a
                href={"/panel/" + row.id}
                className="link-submit font bold clr-white">
                {" "}
                administrer{" "}
              </a>
            </div>
          ))
        )}
      </div>
    );
  }
}
