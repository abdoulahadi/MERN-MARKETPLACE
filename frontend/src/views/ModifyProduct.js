import React, { Component } from "react";
import { createProductDataService } from "../services/product.service";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

export class ModifyProduct extends Component{
    constructor(propos){
        super(propos);
        this.qs = this.qs.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getPathProfile = this.getPathProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        

        this.state = {
            data :{},
            idProduct:window.location.href.split("/")[4]
        }
    }
     qs = ($item)=>{ return document.querySelector($item) }
    // const response = '' ;
    // const {id} = useParams();
     
    
    
    // fetch(`http://localhost:8080/product/${id}`)        
    //   .then(res => res.json())
    //   .then(res => { data = res} )
    //   .catch(err => err);
    getProductById() {
        const productDataService = createProductDataService();
        productDataService.get(this.state.idProduct)
          .then(res => {
            this.setState({ data: res.data });
          })
          .catch(err => err);
      }
    
      componentDidMount() {
        this.getProductById()
      }
    
 onSubmit = (e)=>{
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const productDataServiceMultipart = createProductDataService("multipart/form-data");
    productDataServiceMultipart.update(this.state.data.id,formData)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((error)=>{
        console.log(error);
    })
}
handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  }


getPathProfile = ()=> { this.qs("#path-img-modif-product").innerText = this.qs("#field-img-value").value }
render(){
return ( 
  <form onSubmit={ this.onSubmit }> 
    <div className="large row-sml gap-20">
        <div className="large-5 gap-20"> 
            <div className="col border x-large bg-white gap-10 pad-20 radius-20 col-ctr">
                <span className="clr-gray sml-font" id="path-img-modif-product"> Choose an image of your product </span>
                <label htmlFor="field-img-value" onChange={ this.getPathProfile }> 
                     <img src={'http://localhost:8080/'+ this.state.data.image } alt="Home icon" width="240px" height="160px"/>   
                     <input type="file" name="image" id="field-img-value" /> 
                </label>                      
            </div> 
        </div>

        <div className="large-5">
            <div className="x-large bg-white radius-20 pad-20 col border"> 
                <div className="x-large border-btm row">
                     <span className="clr-gray"> Additionnal information </span>
                </div>
                <div className="col">
                <div className="inputs marge-top-10">
                                <input type="text" name="name" id="name" className="input price" placeholder="price" required value={ this.state.data.name } onChange={this.handleChange}/>
                            </div>
                           <div className="inputs marge-top-10">
                                <input type="text" name="price" id="price" className="input price" placeholder="price" required value={ this.state.data.price } onChange={this.handleChange} />
                            </div>
                            <div className="inputs marge-top-10 category">
                                <select name="category" id="category" value={ this.state.data.category }>
                                    <option value="Catégorie 1"> Catégorie 1 </option>
                                    <option value="Catégorie 2"> Catégorie 2 </option>
                                </select>
                            </div>
                            <textarea name="description" id="description" cols="30" rows="8" className="border marge-top-10 description" placeholder="Description" value={ this.state.data.description } onChange={this.handleChange} />
                 </div>
                 <input type="submit" className="link-submit font bold clr-white marge-top-30" value="Save info"/>
            </div>
        </div>

    </div>

    </form>
    )
}
}
