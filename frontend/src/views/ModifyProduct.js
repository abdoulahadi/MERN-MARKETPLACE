import React from "react";
import { useParams } from "react-router-dom";

export function ModifyProduct()  {

    const qs = ($item)=>{ return document.querySelector($item) }
    const response = '' ;
    const {id} = useParams();
    const data = 
            {
                id : 1,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "01.99",
                category: "t-shirt",
                description : "aaaa aaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa aaaaa aaa aaaaaaaaaaaa aaaaaaa",
                createdAt : "19/04/2004" 
            }
    
    
    // fetch(`http://localhost:8080/product/${id}`)        
    //   .then(res => res.json())
    //   .then(res => { data = res} )
    //   .catch(err => err);

    
const onSubmit = ()=>{
    const price = qs(".price").value;
    const category = qs(".category").value;
    const description = qs(".description").value;
    console.log( { price, category, description } );

    // fetch( "http://localhost:8080/shops" , {
    //     method : "POST",
    //     headers : { "Content-Type" : "application/json" },
    //     body : JSON.stringify({
    //        price,
    //        category,
    //        description
    //     })
    // })       
    // .then(res => {
    //     res.json()
    // })
    // .then(res => { response = res })
    // .catch(err => err);
}


const getPathProfile = ()=> { qs("#path-img-modif-product").innerText = qs("#field-img-value").value }
    
return (  
  <form onSubmit={ onSubmit }> 
    <div className="large row-sml gap-20">
        <div className="large-5 gap-20"> 
            <div className="col border x-large bg-white gap-10 pad-20 radius-20 col-ctr">
                <span className="clr-gray sml-font" id="path-img-modif-product"> Choose an image of your product </span>
                <label htmlFor="field-img-value" onChange={ getPathProfile }> 
                     <img src={'../img/'+ data.image } alt="Home icon" width="240px" height="160px"/>   
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
                                <input type="price" name="mail" id="checkbox" className="input price" placeholder="price" required value={ data.price } />
                            </div>
                            <div className="inputs marge-top-10 category">
                                <select name="category" id="" >
                                    <option value=""> value 1 </option>
                                    <option value=""> value 2 </option>
                                </select>
                            </div>
                            <textarea name="description" id="" cols="30" rows="8" className="border marge-top-10 description" placeholder="Description">
                                { data.description }    
                            </textarea>  
                 </div>
                 <input type="submit" className="link-submit font bold clr-white marge-top-30" value="Save info"/>
            </div>
        </div>

    </div>

    </form>

    )
}
