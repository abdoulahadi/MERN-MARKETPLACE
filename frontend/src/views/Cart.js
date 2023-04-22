/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { createProductDataService } from "../services/product.service";
import { useNavigate } from "react-router-dom";
import { createCommandeDataService } from "../services/commande.service";
import Loader from "./Loader";
import Modal from 'react-modal';


function Cart(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadings, setIsLoadings] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const commandeDataService = createCommandeDataService();
    setIsLoadings(true);
    if (sessionStorage.getItem("user")) {
      if (localStorage.getItem("commande")) {
        const idCommande = JSON.parse(
          localStorage.getItem("commande")
        ).commande;
        commandeDataService
          .getProductsCart(idCommande)
          .then(response => {
            setCarts(response.data.produits);
            setTotalPrice(response.data.prixTotal);
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      } else {
        setCarts([]);
        setIsLoadings(false);
      }
    } else {
      setCarts(JSON.parse(localStorage.getItem("cart")) || []);
      setIsLoading(false);
      setIsLoadings(false);
    }

    setCartUpdated(false);
  }, [cartUpdated]);

  useEffect(() => {
    if (!isLoading && carts.length > 0) {
      const productDataService = createProductDataService();
      const promises = carts.map(idProduct =>
        productDataService.get(idProduct)
      );
      Promise.all(promises)
        .then(responses => {
          const products = responses.map(response => response.data);
          const groupedProducts = {};
          products.forEach(product => {
            if (groupedProducts[product.id]) {
              groupedProducts[product.id].count += 1;
            } else {
              groupedProducts[product.id] = {
                ...product,
                count: 1,
              };
            }
          });
          setIsLoadings(false);
          const groupedProductArray = Object.values(groupedProducts);
          setProducts(groupedProductArray);
          // Calculate total price
          const total = groupedProductArray.reduce((accumulator, product) => {
            return accumulator + product.price * product.count;
          }, 0);
          setTotalPrice(total);
          props.updateCartCount();
        })
        .catch(error => console.log(error));
    }
  }, [isLoading, carts]);

  const handleIncrementClick = (idProduit, index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      count: updatedProducts[index].count + 1,
    };
    updatedProducts[index].isDisabled = false;
    setIsLoadings(true);
    if(!localStorage.getItem("cart")){
      const commandeDataService = createCommandeDataService();
      commandeDataService
        .addCart(
          JSON.stringify({
            idProduit: idProduit,
            idProprietaire: JSON.parse(sessionStorage.getItem("user")).id,
          })
        )
        .then(data => {
          setCartUpdated(true);
          setIsLoadings(false);
        });
    }else{
      let cartItems = JSON.parse(localStorage.getItem("cart"));
      cartItems.push(idProduit);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      setCartUpdated(true);
      setIsLoadings(false);
    }
  };

  const handleDecrementClick = (idProduit, index) => {
    const productsCopy = [...products];
    if (productsCopy[index].count === 1) {
      productsCopy[index].isDisabled = true;
      productsCopy[index].classNameName = "xx-font sml-btn-op clr-white";
    } else if (productsCopy[index].count === 2) {
      productsCopy[index].isDisabled = true;
      productsCopy[index].classNameName = "xx-font sml-btn-op clr-white";
      productsCopy[index].count -= 1;
      if(!localStorage.getItem("cart")){
        const commandeDataService = createCommandeDataService();
        setIsLoadings(true);
        commandeDataService
          .OnewithdrawCart(
            JSON.stringify({
              idProduit: idProduit,
              idCommande: JSON.parse(localStorage.getItem("commande")).commande,
            })
          )
          .then(data => {
            setCartUpdated(true);
            setIsLoadings(false);
          });
      }else{
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        const indexToRemove = cartItems.indexOf(idProduit);
        if (indexToRemove !== -1) {
          cartItems.splice(indexToRemove, 1);
          localStorage.setItem("cart", JSON.stringify(cartItems));
          setCartUpdated(true);
      }
    }
    } else {
      productsCopy[index].count -= 1;
      if(!localStorage.getItem("cart")){
        const commandeDataService = createCommandeDataService();
        setIsLoadings(true);
        commandeDataService
          .OnewithdrawCart(
            JSON.stringify({
              idProduit: idProduit,
              idCommande: JSON.parse(localStorage.getItem("commande")).commande,
            })
          )
          .then(data => {
            setCartUpdated(true);
            setIsLoadings(false);
          });
      }else{
        let cartItems = JSON.parse(localStorage.getItem("cart"));
        const indexToRemove = cartItems.indexOf(idProduit);
        if (indexToRemove !== -1) {
          cartItems.splice(indexToRemove, 1);
          localStorage.setItem("cart", JSON.stringify(cartItems));
          setCartUpdated(true);
      }
    }
    }
  };

  const handleDeleteProduct = (index, idProduit) => {
    setIsLoadings(true);
    if (!sessionStorage.getItem("user")) {
      const productsCopy = [...products];
      const productIds = productsCopy.map(product => product.id);
      productIds.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(productIds));
      setProducts(productsCopy.filter((product, i) => i !== index));
      setIsLoadings(false);
      props.updateCartCount();
    } else {
      const commandeDataService = createCommandeDataService();
      commandeDataService
        .AllwithdrawCart(
          JSON.stringify({
            idProduit: idProduit,
            idCommande: JSON.parse(localStorage.getItem("commande")).commande,
          })
        )
        .then(res => {
          if (res.data.remove) {
            localStorage.removeItem("commande");
          }
          setCartUpdated(true);
          setIsLoadings(false);
          props.updateCartCount();
        })
        .catch(error => console.log(error));
    }
  };

  const handleronSubmit = () => {
    if (sessionStorage.getItem("user")) {
      const commandeDataService = createCommandeDataService();
      setIsLoadings(true);
      commandeDataService
        .payment(JSON.parse(localStorage.getItem("commande")).commande)
        .then(data => {
          setIsLoadings(false);
          localStorage.removeItem("commande");
          setCartUpdated(true);
          handleShowModal();
        });
    } else {
      localStorage.setItem("page_view", "/cart");
      navigate("/login");
    }
  };
  
  const handleCloseModal = () => {
    console.log("ok")
    navigate("/")
    setShowModal(false)
  };
  
  const handleShowModal = () => {
    setShowModal(true);
    setIsLoading(true);
    setCartUpdated(true);
  };
  return (
    <div className="row-sml pad-20 gap-20">
          <Modal
  isOpen={showModal}
  onRequestClose={()=>handleCloseModal()}
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      padding: '50px'
    }
  }}
>
  <div style={{ textAlign: 'center' }}>
    <h2 style={{ marginBottom: '20px' }}>La commande a été enregistrée.</h2>
    <p style={{ fontSize: '20px' }}>Merci pour votre achat.</p>
    <button style={{ marginTop: '30px', backgroundColor: '#6c757d', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} onClick={() =>{ props.updateCartCount();navigate("/")}}>Fermer</button>
  </div>
</Modal>

      {/*  ******************************** RIGHT BOX ***************************************/}
      {isLoadings && <Loader />}
      <div className="col bg-white pad-20 border x-large gap-20">
        <span className="x-font clr-gray bold marge-btm"> Panier (2) </span>
        {/* ********************************* LISTB OF PRODUCT *********************************** */}
        {products.length > 0
          ? products.map((row, index) => (
              <div className="col border-btm" key={row.id}>
                <div className="row-sb-sml x-large gap-10">
                  <img
                    src={"http://localhost:8080/" + row.image}
                    alt="Home icon"
                    width="100px"
                    height="100px"
                  />
                  <div className="col large-7">
                    <span className="font clr-gray"> {row.name} </span>
                    <span className="bold"> {row.vendeur.name}</span>
                  </div>
                  <div className="col-p-rgt large-3">
                    <span className="x-font bold clr-gray text">
                      {" "}
                      {row.price} $ {" "}
                    </span>
                  </div>
                </div>

                <div className="row-sb-md x-large marge-btm">
                  <button
                    className="row-ctr gap-20 marge-top-10"
                    onClick={() => handleDeleteProduct(index, row.id)}>
                    <img
                      src="../img/icons8-delete-trash-48.png"
                      alt="Home icon"
                      width="24px"
                      height="24px"
                    />
                    <span className="clr-green bold"> SUPPRIMER </span>
                  </button>
                  <div className="row-ctr gap-20">
                    <span
                      className={
                        row.isDisabled
                          ? row.classNameName
                          : "xx-font sml-btn clr-white"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDecrementClick(row.id, index)}>
                      {" "}
                      -{" "}
                    </span>
                    <span className="font clr-gray"> {row.count} </span>
                    <span
                      className="xx-font sml-btn clr-white"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleIncrementClick(row.id, index)}>
                      {" "}
                      +{" "}
                    </span>
                  </div>
                </div>
              </div>
            ))
          : !isLoadings && (
              <span className="smal-font clr-gray">Panier vide</span>
            )}
      </div>

      {/* ******************************** pay container ***************************************/}
      {products.length > 0 ? (
        <div className="pay-box col bg-white pad-20 border">
          <div className="col gap-20">
            <span className="bold clr-gray"> RESUME DE PANIER </span>
            <div className="row-sb-md gap-20">
              <span className="smal-font clr-gray"> Sous-total </span>
              <span className="font clr-gray bold">
                {" "}
                {parseFloat(totalPrice).toFixed(2)} ${" "}
              </span>
            </div>
            <div className="col">
              <span className="smal-font clr-gray">
                Avant de finaliser votre commande, veuillez vérifier que les
                articles et les quantités sont corrects. Si tout est en ordre,
                cliquez sur le bouton "Commander" pour valider.
              </span>
            </div>
            <button
              className="pad-20 btn-buy clr-white bold"
              onClick={handleronSubmit}>
              {" "}
              COMMANDER ( {parseFloat(totalPrice).toFixed(2)} $ ){" "}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
