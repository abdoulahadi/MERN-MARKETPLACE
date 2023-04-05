import React from "react";
import { useParams } from "react-router-dom";

export function Shop()  {

    const qs = ($item)=>{ return document.querySelector($item) }
    const {id} = useParams();
    const data = [];
 
    // fetch(`http://localhost:8080/product/${id}`)        
    //   .then(res => res.json())
    //   .then(res => { data = res} )
    //   .catch(err => err);
  

   
    return (
             
<div className="">
    
    <div className="bg-gray pad-20 large">
        <span className="x-font clr-bleue marge row"> shop's name </span>
    </div>
     {/*  ******************************** ARTICLES ***************************************/}
     <div className="row-md pad-20 large">

    { data.map( row => ( 

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
