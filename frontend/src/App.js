import { Header} from './views/Header';
import { Footer } from './views/Footer';
import { Home } from './views/Home.js';
import { Allshop } from './views/Allshop.js';
import { Profile } from './views/Profile.js';
import { Panel } from './views/Panel.js';
import { Myshop } from './views/Myshop.js';
import { ModifyProduct } from './views/ModifyProduct.js';
import { Login } from './views/Login.js';
import { Signup } from './views/Signup.js';
import { Shop } from './views/Shop.js';
import { Error } from './views/Error.js';
import React , {Component} from "react";
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import { createCommandeDataService } from "./services/commande.service";
import  Cart  from './views/Cart';


class App extends Component {

  constructor(props) {
    super(props);
    this.updateCartCount = this.updateCartCount.bind(this);
    this.addTocart = this.addTocart.bind(this);
    this.state = { 
      allShopData : [],   
      userShopData : [],
      allProductData : [],
      userProductData : [],
      userData:[],
      cartCount:0,
      cart:[]
      // testing
      // profileData: [ {
      // name : "Full Metal",
      // mail : "dev@hotmail.com" }
      // ] ,
      // shopData : [
      //   {
      //     id : 1,
      //     image : "senegal.jpg",
      //     name : "GOLD SHOP",
      //     description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aut, hic quae excepturi quas repellendus ducimus earum architecto.",
      //     createdAt : "12/03/23",
      //     modifyAt : "15/04/25"
      //   },
      //   {
      //     id : 2,
      //     image : "senegal.jpg",
      //     name : "hardware SHOP",
      //     description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aut, hic quae excepturi quas repellendus ducimus earum architecto.",
      //     createdAt : "12/03/23",
      //     modifyAt : "15/04/25"
      //   },
      //   {
      //     id : 3,
      //     image : "senegal.jpg",
      //     name : "foot SHOP",
      //     description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aut, hic quae excepturi quas repellendus ducimus earum architecto.",
      //     createdAt : "12/03/23",
      //     modifyAt : "15/04/25"
      //   }
      // ]
    };
  }
  componentDidMount(){
    this.updateCartCount()
  }
  async updateCartCount() {
    const commandeDataService = createCommandeDataService();
    let cart = [];
  
    if (sessionStorage.getItem("user")) {
      if(localStorage.getItem("commande")){
        const idCommande = JSON.parse(localStorage.getItem("commande")).commande;
        const response = await commandeDataService.getProductsCart(idCommande);
        cart = response.data.produits;
      }else{
        cart = [];
      }
    } else {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
  
    this.setState({
      cart: cart,
      cartCount: cart.length
    });
  }
  
  async addTocart(idProduct){
    const isUserConnecter = sessionStorage.getItem("user")
    const commandeDataService = createCommandeDataService();

    if(isUserConnecter){
      const response = await commandeDataService.addCart(JSON.stringify({
        idProduit:idProduct,
        idProprietaire: JSON.parse(sessionStorage.getItem("user")).id
      }))
    if(!localStorage.getItem("commande")){
      localStorage.setItem("commande", JSON.stringify({commande:response.data.commande.id}))
    }
    }else{
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push(idProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
    }
    this.updateCartCount()
  }

render(){

  return (
    <BrowserRouter>
      <Header count={this.state.cartCount} updateCartCount={this.updateCartCount}/>
      <Routes>
        <Route path="/" element={ <Home addTocart = {this.addTocart} /> } ></Route>
        <Route path="/all-shop" element={ <Allshop />} ></Route>
        <Route path="/login" element={ <Login updateCartCount={this.updateCartCount} /> } ></Route>
        <Route path="/panel/:id" element={ <Panel /> } ></Route>
        <Route path="/profile" element={ <Profile /> } ></Route>
        <Route path="/modify-product/:id" element={ <ModifyProduct /> } ></Route> 
        <Route path="/my-shop" element={ <Myshop /> } ></Route>
        <Route path="/shop/:id" element={ <Shop addTocart = {this.addTocart} /> } ></Route>
        <Route path="/sign-up" element={ <Signup /> } ></Route>
        <Route path="/cart" element={ <Cart updateCartCount={this.updateCartCount}/> } ></Route>
        <Route path="*" element={ <Error />  } ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
}
export default App;
