/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from "react";

export class Shop extends Component {

constructor(props) {
    super(props);
    this.state = { 
        idShop : '',
        allProductByShop : []
    };
}
 
// fetch( {'http://localhost:9000/productByIdShop/':this.state.idShop} ) 
getProducts() {
    fetch("http://localhost:8080/product")        
      .then(res => res.json())
      .then(res => this.setState({ allProductByShop : res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.getProducts();
  }


render() {      
    return (
             
<div className="">

    <div className="bg-gray pad-20 large">
        <span className="x-font clr-bleue marge row"> shop's name </span>
    </div>

     {/*  ******************************** ARTICLES ***************************************/}
     <div className="row-md pad-20 large">

    { this.state.allProductByShop.map( row => ( 

        <div className="">
            <img src={'../img/'+row.image} alt="Home icon" width="240px" height="160px"/>
            <div className="hashtag row-sb-md">
                <div className="col">
                    <span className="clr-white"> { row.name } </span>
                    <span className="sml-font clr-white"> { '$ '+row.price }  </span>
                </div>
                <div className="row">
                    <a href=""> <img src="../img/icons8-shopping-cart-24.png" alt="Home icon" width="24px" height="24px"/> </a>
                </div>
            </div>
        </div>
    )) }  

    </div>
</div>


    )
}
}