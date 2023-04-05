import React , {Component} from 'react' ;

export class Home extends Component {
 
   
    constructor(props) {
        super(props);
        this.state = {  
            latestProduct : [ 
            {  id : 1 ,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "27.99",
                description : "aaaa aaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa aaaaa aaa aaaaaaaaaaaa aaaaaaa",
                createdAt : "19/04/2004" 
            },
            {
                id : 2 ,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "27.99",
                description : "bbbbb bbbbbb bbbbbbbbbb bbbbbbbb bbbbbbbbbbbbbb bbbbbbb bbbb bbb bbb bbbb bbbbbb",
                createdAt : "19/04/2004" 
            },
            {
                id : 3 ,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "27.99",
                description : "ccc ccccc ccccccccc ccccccc cccccc ccccccc ccccccccc ccccccc ccccccccc cccccccc",
                createdAt : "19/04/2004" 
            }
        ],
            searchProduct : [],
            allProduct : [],         
        };

        this.state.searchProduct = this.state.latestProduct;
        this.state.allProduct = this.state.latestProduct;
    }

//  getLatestProduct() {
  //   fetch( "http://localhost:9000/latestProduct/" )
  //     .then(res => res.json())
  //     .then(res => this.setState({ latestProduct : res }))
  //     .catch(err => err);
  // }
//  getProductByCategory() {
  //   fetch( {'http://localhost:9000/productBycategory/':category} )
  //     .then(res => res.json())
  //     .then(res => this.setState({ latestProduct : res }))
  //     .catch(err => err);
  // }
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

render() {

return ( 

<div>
    
<div className="x-row pad-20 gap-20">
  
 {/*  ******************************** RIGHT BOX ***************************************/}
        <div className="large-7 col">
        {/* ******************************** FIRST ITEM OF RIGHT BOX ***************************************/}
            <div className="x-large col shadow"> 
                {/* ******************************** SEARCH BAR ***************************************/}
                <div className="row bg-gray pad-20 x-large">
                    <div className="col">
                        <span className="sml-font clr-gray"> Select category </span>
                        <select name="" id="" className="select">
                            <option value=""> value 1 </option>
                            <option value=""> value 2 </option>
                        </select>
                    </div>
                    <div className="col">
                        <span className="sml-font clr-gray"> Select product </span>
                        <div className="row">
                            <input type="text" name="" id="" className="search-field" placeholder="product" />
                            <button type="submit" className="search-btn row-ctr"> 
                                <img src="./img/icons8-search-50.png" alt="Home icon" width="24px" height="24px"/>
                            </button>
                        </div>
                    </div>      
                </div>
                
                {/********************************* ARTICLES ***************************************/} 
                <div className="row-md pad-20 x-large">
                { this.state.searchProduct.map( row => (     
                    <div key={row.id}>
                        <img src={"./img/" + row.image} alt="Home icon" width="260px" height="160px"/>
                        <div className="hashtag row-sb-md">
                            <div className="col">
                                <span className="clr-white"> {row.name} </span>
                                <span className="sml-font clr-white"> {'$ '+ row.price} </span>
                            </div>
                            <a href=""> <img src="./img/icons8-shopping-cart-24.png" alt="Home icon" width="24px" height="24px"/> </a>
                        </div>
                    </div>   
                 ))}    
                </div>
            </div>
        {/********************************* SECOND ITEM OF RIGHT BOX ***************************************/}
            <div className="x-large col shadow marge-top-10"> 
                <div className="col bg-gray gap-10 x-large">
                    <span className="font clr-bleue bold marge"> Explore by category </span>
                    <div className="row">
                        <select name="" id="" className="btn-explore">
                            <option value=""> value 1 </option>
                            <option value=""> value 2 </option>
                        </select>
                        <button className="btn-explore" > Tools </button>
                        <button className="btn-explore" > Shoes </button>
                        <button className="btn-explore" > Sports </button>
                    </div>
                </div>

                <div className="row-md pad-20">
                { this.state.allProduct.map( row => (     
                    <div className="">
                        <img src={"./img/" + row.image} alt="Home icon" width="260px" height="160px"/>
                        <div className="hashtag row-sb-md">
                            <div className="col">
                                <span className="clr-white"> {row.name} </span>
                                <span className="sml-font clr-white"> {'$ '+ row.price} </span>
                            </div>
                            <a href=""> <img src="./img/icons8-shopping-cart-24.png" alt="Home icon" width="24px" height="24px"/> </a>
                        </div>
                    </div>   
                 ))}
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

        {this.state.latestProduct.map(row => (    
            <div className="latest-item row-ctr pad-5">
                <img src={"./img/"+row.image } alt="Home icon" width="100px" height="120px"/>
                <div className="col pad-10 x-large">
                    <span className="clr-bleue bold row"> {row.name} </span>
                    <div className="x-large row">
                        <img src="./img/icons8-shopping-cart-24.png" alt="Home icon" width="24px" height="24px"/>
                        <span className="clr-bleue"> Happy Feet</span>
                    </div>
                    <span className="sml-font clr-bleue x-large row"> {'added on '+ row.createdAt } </span>
                    <div className="row-sb x-large">
                        <span className="clr-bleue"> {'$ '+ row.price } </span>
                        <div className="row">
                            <a href=""> <img src="./img/icons8-eye-24.png" alt="Home icon" width="24px" height="24px"/> </a>
                            <a href=""> <img src="./img/icons8-shopping-cart-24.png" alt="Home icon" width="24px" height="24px"/> </a>
                        </div>
                    </div>
                </div>
            </div>
        ))}
            
            </div>

        </div>
    </div>


</div>
  )
}
}
