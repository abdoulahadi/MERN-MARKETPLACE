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


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      allShopData : [],   
      userShopData : [],
      allProductData : [],
      userProductData : [],
      userData:[],
      // testing
      profileData: [ {
      name : "Full Metal",
      mail : "dev@hotmail.com" }
      ] ,
      shopData : [
        {
          id : 1,
          image : "senegal.jpg",
          name : "GOLD SHOP",
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aut, hic quae excepturi quas repellendus ducimus earum architecto.",
          createdAt : "12/03/23",
          modifyAt : "15/04/25"
        },
        {
          id : 2,
          image : "senegal.jpg",
          name : "hardware SHOP",
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aut, hic quae excepturi quas repellendus ducimus earum architecto.",
          createdAt : "12/03/23",
          modifyAt : "15/04/25"
        },
        {
          id : 3,
          image : "senegal.jpg",
          name : "foot SHOP",
          description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim aut, hic quae excepturi quas repellendus ducimus earum architecto.",
          createdAt : "12/03/23",
          modifyAt : "15/04/25"
        }
      ]
    };
  }

render(){

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } ></Route>
        <Route path="/all-shop" element={ <Allshop data = {this.state.shopData} /> } ></Route>
        <Route path="/login" element={ <Login /> } ></Route>
        <Route path="/panel/:id" element={ <Panel /> } ></Route>
        <Route path="/profile" element={ <Profile /> } ></Route>
        <Route path="/modify-product/:id" element={ <ModifyProduct /> } ></Route> 
        <Route path="/my-shop" element={ <Myshop data = {this.state.shopData}/> } ></Route>
        <Route path="/shop/:id" element={ <Shop /> } ></Route>
        <Route path="/sign-up" element={ <Signup /> } ></Route>
        <Route path="*" element={ <Error />  } ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
}
export default App;
