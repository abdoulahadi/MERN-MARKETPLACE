import React from "react";
import { useNavigate } from "react-router-dom";
import {createUserDataService} from "../services/user.service";

 
export function Login()  {

const qs = ($item)=>{ return document.querySelector($item) }

let response = '';

const navigate = useNavigate();
    
const onSubmit = (event)=>{
    event.preventDefault(); 
    const mail = qs(".mail").value;
    const password = qs(".pswd").value;
    console.log( { mail, password } );
    // navigate('/');
    const userDataService = createUserDataService();
    userDataService.login(JSON.stringify({
        mail:mail,
        password:password 
    }))       
    .then(res => {
        console.log(res.data.user)
        sessionStorage.setItem("user",JSON.stringify(res.data.user))
            navigate('/')
    })
    .catch(err => {
        
        qs("#error").style.display = "block";
        qs("#error span").innerHTML = err.response.data.error
         console.log(err)
        //  navigate('/sign-in')
        });
}

console.log(`La reponse est : ${response}`);
    
return(
                    
<div className="log-form">

<fieldset className="x-large pad-10 border bg-white">
    <legend className="clr-gray"> Connexion </legend>
    <span className="xx-font clr-gray"> Marketplace </span>
</fieldset>
 
<form onSubmit={onSubmit} className="bg-white">

    <div className="item-form marge-top-10">
        <div className="inputs">
            <img src="./img/icons8-composing-mail-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="text" name="mail" id="mail" className="input mail" placeholder="mail.." required />
        </div>

        <div className="inputs">
            <img src="./img/icons8-forgot-password-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="password" name="password" id="password" className="input pswd" placeholder="password.." required />
        </div>
        
        <a href="/sign-up" className="clr-gray"> create account now ! </a> 

    </div>
    <input type="submit" className="btn-submit x-large font bold clr-white" value="Connect" />
</form>

<div className="x-large pad-10 bg-pink" style={{display:"none"}} id="error">
    <span className="clr-white">  </span>
</div>

</div>

    )

}

