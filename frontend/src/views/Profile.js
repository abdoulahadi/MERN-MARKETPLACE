import React from "react";
import { useParams } from "react-router-dom";

function qs($item) {
    return document.querySelector($item);
}
function getPathProfile(){
    qs("#path-photo").innerText = qs("#photo").value ; 
}


export function Profile( props) {

    let {id} = useParams();
    let {val} = window.URLSearchParams;
    return (  

    <div className="large row-sml gap-20">
        <h1> {id} {val}</h1>
        <div className="large-5 col gap-20"> 
            <div className="row-ctr border x-large bg-white gap-10 pad-20 radius-20">
                <div className="col profile border">
                    <img src="./img/profile.png" alt="Profile" className="profile" />
                    <label htmlfor="photo" id="btn-profile" className="pad-10 row-ctr" onChange={getPathProfile}> 
                        <img src="./img/icons8-camera-30.png" alt="Home icon"/>   
                        <input type="file" name="" id="photo"/> 
                    </label>
                </div>    
                <div className="col">
                    <span className="clr-gray sml-font" id="path-photo"> </span>
                    <input type="submit"  className="link-submit font bold clr-white marge-top-30" value="Save"/>
                </div>
                    
            </div>
            
            <div className="col x-large border bg-white pad-20 radius-20">
                <span className="clr-gray"> username : { window.sessionStorage.name }  </span>
                <span className="clr-gray"> mail : { window.sessionStorage.mail }  </span>
            </div>
           
        </div>

        <div className="large-5">
            <div className="x-large bg-white radius-20 pad-20 col border"> 
                <div className="x-large border-btm row">
                     <span className="clr-gray"> Additionnal information </span>
                </div>
                <div className="col">
                     <div className="inputs marge-top-10 marge-4">
                         <input type="text" name="mail" id="checkbox" className="input" placeholder="mail.." required/>
                     </div>
                     <div className="inputs marge-4">
                         <input type="text" name="mail" id="checkbox" className="input" placeholder="mail.." required/>
                     </div>
                     <div className="inputs marge-4">
                         <input type="text" name="mail" id="checkbox" className="input" placeholder="mail.." required/>
                     </div>
                     <div className="inputs marge-4">
                         <input type="text" name="mail" id="checkbox" className="input" placeholder="mail.." required/>
                     </div>
                     <div className="inputs marge-4">
                         <input type="text" name="mail" id="checkbox" className="input" placeholder="mail.." required/>
                     </div>
                 </div>
                 <input type="submit"  className="link-submit font bold clr-white marge-top-30" value="Save info"/>
            </div>
        </div>

    </div>



    )
}