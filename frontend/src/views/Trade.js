/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Countdown from "react-countdown";
import { createAuctionDataService } from "../services/auction.service";

import io from 'socket.io-client';
function showNotification(message) {
  const notification = document.querySelector('.notification-text');
  const notificationContainer = document.querySelector('.notification-container');
  notification.innerHTML = message;
  notificationContainer.style.display = 'block';

  setTimeout(() => {
    notificationContainer.style.display = 'none';
  }, 5000); // 5000 millisecondes = 5 secondes
}
export class Auction extends Component {
  constructor(props) {
    super(props);
    this.modal2Show = this.modal2Show.bind(this)
    this.modal2Hide = this.modal2Hide.bind(this)
    this.qs = this.qs.bind(this)
    this.qsa = this.qsa.bind(this)
    this.submitPlaceBid = this.submitPlaceBid.bind(this)
    this.state = {
      product: [],
      idAuction: 0,
      socket:io('http://localhost:8080')
    };
  }
  qs = $item => {
    return document.querySelector($item);
  };
  qsa = $item => {
    return document.querySelectorAll($item);
  };
  modal2Show(id){
    this.setState({
      idAuction:id
    })
    this.qs(".modal2").style.display = "block";
  }
  
  modal2Hide(){
    this.qs(".modal2").style.display = "none";
  }
  componentDidMount(){
    const auctionDataService = createAuctionDataService();
    auctionDataService.active()
    .then(auctionData =>{
      this.setState({
        product:auctionData.data
      })
    })
    this.state.socket.on('newPlaceBid', data => {
      const auctionDataService = createAuctionDataService();
        auctionDataService.active()
        .then(auctionData =>{
          this.setState({
            product:auctionData.data
          })
        })
        showNotification(`${data.message}`);
    });
    this.state.socket.on('newAuction', data => {
      const auctionDataService = createAuctionDataService();
        auctionDataService.active()
        .then(auctionData =>{
          this.setState({
            product:auctionData.data
          })
        })
        showNotification(`${data.message}`);
    });
  }
  submitPlaceBid(event){
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form);
    const idAuction = this.state.idAuction

    const auctionDataService = createAuctionDataService();
    const idUser = JSON.parse(sessionStorage.getItem("user")).id
    auctionDataService.placeBid(idAuction,idUser,formData)
    .then(auctionData =>{
      form.reset();
    })

  }
  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Enchère terminée</span>;
    } else {
      return (
        <span>
          {days}j {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  render() {
    return (
      <div className="container-trade">
        {sessionStorage.getItem("user") &&
        <div className="notification-container" style={{display:'none'}}>
        <div className="notification">
          <p className="notification-text"></p>
          <button className="close-notification">x</button>
        </div>
      </div>
        }
        <div className="modal modal2" style={{display:'none'}}>
          <div className="modal-item pad-20 bg-white col-ctr">
            <button
              id="btn-modal-hidden"
              className="font bold"
              onClick={this.modal2Hide}>
              {" "}
              X{" "}
            </button>
            <fieldset className="border">
              <legend className="font clr-gray"> Add Bidding </legend>
              <div className="x-large col gap-20">
                <form onSubmit={this.submitPlaceBid}>
                  <div className="col">
                    <div className="inputs marge-top-10">
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        className="input"
                        placeholder="amount"
                        required
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    id="btn-submit-add-product"
                    onClick={this.modal2Hide}
                    className="link-submit font bold clr-white marge-top-10"
                    value="Place"
                  />
                </form>
              </div>
            </fieldset>
          </div>
        </div>
<div className="row bg-white pad-30 shadow">
  {this.state.product.map(row => (
    <div className="col-p-rgt col-3 border pad-10 marg-rgt" key={row.id}>
      <img
        src={"http://localhost:8080/" + row.product.image}
        alt="Home icon"
        width="100%"
        height="120px"
      />
      <div className="col">
        <span className="clr-gray">product : {row.product.name}</span>
        <span className="clr-gray">starting price : {row.startingPrice} $</span>
        <button
          type="submit"
          className="link-submit font bold clr-white marge-top-10"
          onClick={() => this.modal2Show(row.id)}
        >Place Bid</button>
        <div className="x-large row-sb-sml bg-pink pad-10 marge-top-30">
          <div className="col-y-ctr">
            <div className="pad-10 row">
              <span className="clr-white bold">Vente Enchère</span>
              <span className="clr-white">
              <Countdown date={new Date(row.auctionEndTime)} renderer={this.renderer}/>
              </span>
            </div>
            {row.bids.length>0 && <div className="pad-10 row">
              <span className="clr-white bold">Bid le plus élevé :</span>
              <span className="clr-white">{row.bids[row.bids.length-1].amount} $</span>
            </div>}
            
            {row.bids.length>0 &&<div className="pad-10 row">
              <span className="clr-white bold">Placé par :</span>
              <span className="clr-white">{row.bids[row.bids.length-1].user.username}</span>
            </div>}
            
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
