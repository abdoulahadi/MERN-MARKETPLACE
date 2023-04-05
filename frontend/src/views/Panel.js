import React from "react";
import { useParams } from "react-router-dom";

export function Panel()  {

    const qs = ($item)=>{ return document.querySelector($item) }
    const qsa = ($item) => { return document.querySelectorAll($item) }
    const {id} = useParams();
    // alert(id);
    const data =  [
            {
                id : 1,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "01.99",
                description : "aaaa aaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa aaaaa aaa aaaaaaaaaaaa aaaaaaa",
                createdAt : "19/04/2004" 
            },
            {
                id : 2,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "08.99",
                description : "bbbbb bbbbbb bbbbbbbbbb bbbbbbbb bbbbbbbbbbbbbb bbbbbbb bbbb bbb bbb bbbb bbbbbb",
                createdAt : "19/04/2004" 
            },
            {
                id : 3,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "11.99",
                description : "ccc ccccc ccccccccc ccccccc cccccc ccccccc ccccccccc ccccccc ccccccccc cccccccc",
                createdAt : "19/04/2004" 
            },
            {
                id : 4,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "06.99",
                description : "aaaa aaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa aaaaa aaa aaaaaaaaaaaa aaaaaaa",
                createdAt : "19/04/2004" 
            },
            {
                id : 5,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "13.99",
                description : "bbbbb bbbbbb bbbbbbbbbb bbbbbbbb bbbbbbbbbbbbbb bbbbbbb bbbb bbb bbb bbbb bbbbbb",
                createdAt : "19/04/2004" 
            },
            {
                id : 6,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "17.99",
                description : "ccc ccccc ccccccccc ccccccc cccccc ccccccc ccccccccc ccccccc ccccccccc cccccccc",
                createdAt : "19/04/2004" 
            },
            {
                id : 7,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "02.99",
                description : "aaaa aaaa aaaaaaaaaaa aaaaaaaaa aaaaaaaa aaaaaaa aaaaa aaa aaaaaaaaaaaa aaaaaaa",
                createdAt : "19/04/2004" 
            },
            {
                id : 8,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "30.99",
                description : "bbbbb bbbbbb bbbbbbbbbb bbbbbbbb bbbbbbbbbbbbbb bbbbbbb bbbb bbb bbb bbbb bbbbbb",
                createdAt : "19/04/2004" 
            },
            {
                id : 9,
                image : "senegal.jpg",
                name : "Beaded Rhino Brooch",
                price : "27.99",
                description : "ccc ccccc ccccccccc ccccccc cccccc ccccccc ccccccccc ccccccc ccccccccc cccccccc",
                createdAt : "19/04/2004" 
            }
        ];

    // fetch(`http://localhost:8080/product/${id}`)        
    //   .then(res => res.json())
    //   .then(res => { data = res} )
    //   .catch(err => err);
  



const addProduct = () => { qsa(".modal")[0].style.display="block" };

const hideModal = () => { qsa(".modal")[0].style.display="none" };

const delshop = () => { qsa(".modal")[1].style.display="block" };

const hidePopup = () => { qsa(".modal")[1].style.display="none" };

const getPathProfile = () => { qs("#path-img").innerText = qs("#photo-modal").value };
    
return (
             
<div className="">

     {/* ******************************* Modal ********************************* */} 
    <div className="modal" >
        <div className="modal-item pad-20 bg-white col-ctr">
            <button id="btn-modal-hidden" className="font bold"  onClick={hideModal}> X </button>
            <fieldset className="border">
                <legend className="font clr-gray"> New product </legend>
                    <div className="x-large col gap-20"> 
                        <div className="col">
                            <div className="row-ctr gap-20">
                                <label htmlFor="photo-modal" id="add-img" className="pad-10 row-ctr marge-top-10" onChange={getPathProfile}> 
                                    <img src="../img/icons8-camera-30.png" alt=""/>   
                                    <input type="file" name="" id="photo-modal" /> 
                                </label>
                                <span className="clr-gray sml-font" id="path-img" >  </span>
                            </div>
                            <div className="inputs marge-top-10">
                                <input type="text" name="mail" id="checkbox" className="input" placeholder="price" required />
                            </div>
                            <div className="inputs marge-top-10">
                                <select name="" id="" >
                                    <option value=""> value 1 </option>
                                    <option value=""> value 2 </option>
                                </select>
                            </div>
                            <textarea name="" id="" cols="30" rows="5" className="border marge-top-10" placeholder="Description"></textarea>  
                        </div>
                        <input type="submit" id="btn-submit-add-product" onClick={hideModal} className="link-submit font bold clr-white marge-top-10" value="Save" />
                    </div> 
            </fieldset>
        </div>
    </div>

 {/* ******************************* Modal ********************************* */}

    <div className="modal">
        <div className="modal-item pad-20 bg-white">
            <button id="btn-modal-hidden" className="font bold"  onClick={hidePopup}> X </button>
            <div className="x-large col gap-20 pad-20"> 
                <div className="col-ctr gap-20">
                    <span className="clr-gray font" id="path-img" >  Would you really delete your shop </span>
                    <div className="col">
                        <input type="submit" id="btn-submit-add-product" onClick={hidePopup} className="link-submit bold clr-white marge-top-10" value="YES" />    
                    </div>
                </div>              
            </div> 
        </div>
    </div>

    {/* ******************************* PALETTE ********************************* */}
     
    <div className="palette col bg-white border">
        <button id="add-product-btn" onClick={addProduct}> <img src="../img/icons8-add-new-50.png" alt="Home icon" title="add product" width="24px" height="24px"/> </button>
        <a href="/" > <img src="../img/icons8-settings-50.png" alt="Home icon" title="accounting" width="24px" height="24px"/> </a>
        <button id="add-product-btn" onClick={delshop}> <img src="../img/icons-delete-trash-48.png" alt="Home icon" title="delete shop" width="24px" height="24px"/> </button>
        <a href="my-shop" className=""> <img src="../img/icons8-go-back-30.png" alt="Home icon" title="back" width="24px" height="24px"/> </a>
    </div>
    
    <div className="bg-gray pad-20 large">
        <span className="x-font clr-bleue marge row"> All my shop's product </span>
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
                    <a href={'/modify-product/'+row.id}> <img src="../img/icons8-eye-24.png" title="modify" alt="Home icon" width="24px" height="24px"/> </a>
                    <a href={'/del?id='+row.id}> <img src="../img/icons8-delete-trash-48.png" title="delete" alt="Home icon" width="24px" height="24px"/> </a>
                </div>
            </div>
        </div>
    )) }  

    </div>
</div>


    )
    }