import React, {Component} from "react";

export class Myshop extends Component {

constructor(props) {
    super(props);
    this.state = { 
        idUser : sessionStorage.id ,
        myshop : props.data // [] array
   }
}

//  getShopByUser() {
//     fetch( {'http://localhost:9000/shopByUser/':this.state.idUser} )       
//       .then(res => res.json())
//       .then(res => this.setState({ myshop  : res }))
//       .catch(err => err);
//   }

  // componentDidMount() {
  //   this.getShopByUser();
  // }


qs = ($item) => { return document.querySelector($item) }
    
addShop = ()=> { this.qs("#shop-modal").style.display="block" }
    
hideShopModal = () => { this.qs("#shop-modal").style.display="none" }
    
getPathProfile = () => { this.qs("#path-img-shop").innerText = this.qs("#photo-shop").value  }
    
render() {

return (
 
<div>
    
    <button id="btn-new-shop" onClick={this.addShop}> New shop </button>

      {/* ******************************* Modal ********************************* */} 
      <div className="modal" id="shop-modal">
      
        <div className="modal-item pad-20 bg-white col-ctr">
            <button id="btn-modal-hidden" className="font bold" onClick={this.hideShopModal}> X </button>
            <fieldset className="border">
                <legend className="font clr-gray"> New shop </legend>
                    <div className="x-large col gap-20"> 
                        <div className="col">
                            <div className="row-ctr gap-20">
                                <label htmlFor="photo-shop" id="add-img" className="pad-10 row-ctr marge-top-10" onChange={this.getPathProfile}> 
                                    <img src="../img/icons8-camera-30.png" alt=""/>   
                                    <input type="file" name="" id="photo-shop" /> 
                                </label>
                                <span className="clr-gray sml-font" id="path-img-shop" >  </span>
                            </div>
                            <div className="inputs marge-top-10">
                                <input type="text" name="mail" id="checkbox" className="input" placeholder="shop's name" required />
                            </div>
                            <textarea name="" id="" cols="30" rows="5" className="border marge-top-10" placeholder="Description"></textarea>  
                        </div>
                        <input type="submit" id="btn-submit-add-product" onClick={this.hideShopModal} className="link-submit font bold clr-white marge-top-10" value="Save" />
                    </div> 
            </fieldset>
        </div>
    </div>

   <div className="large row marge-top-30">
        <img src="../img/icons8-user-30.png" alt="Home icon" width="24px" height="24px"/>
        <span className="clr-gray"> owner : {sessionStorage.name}</span>
   </div>
    <div className="large border-btm row">
         <span className="clr-gray"> My shops </span>
    </div>    
    <div className="large pad-20 bg-pink row-ctr">
        <span className="clr-white"> there is no shop currently </span>
     </div>

     { this.state.myshop.map(row => ( 
   
    <div className="large shadow pad-10 bg-white row-sb-sml">
        <div className="x-large row-y-ctr">
            <img src="../img/icons8-shopping-mall-100.png" alt="Home icon" width="50px" height="50px"/>
            <div className="pad-10 col">
                <span className="clr-gray"> shop : {row.name}   created at : {row.createdAt + ' and modify at :' + row.modifyAt }  </span>
                <span className="clr-gray"> {row.description}  </span>
            </div>
        </div>
        <a href={'/panel/'+row.id }  className="link-submit font bold clr-white"> administrer </a>
    </div>

     ))} 

</div>

    )
}
}