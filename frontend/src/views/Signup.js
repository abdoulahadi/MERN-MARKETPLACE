import React from "react";
import {createUserDataService} from "../services/user.service";
import { useNavigate } from "react-router-dom";

export function Signup()  {

    const qs = ($item)=>{ return document.querySelector($item) }

    let response = '';
    const navigate = useNavigate();
    
        
    const onSubmit = (event)=>{
        event.preventDefault(); 
        const username = qs(".username").value;
        const mail = qs(".mail").value;
        const password = qs(".pswd").value;
        console.log( { username, mail, password } );
        // navigate('/login');
        // fetch("http://localhost:8080/users", {
        //     method : "POST",
        //     crossDomain : true,
        //     headers : { 
        //         "Content-Type" : "application/json",
        //         Accept: "application/json",
        //         "Access-control-Allow-Origin":"*",
        //     },
        //     body : JSON.stringify({
        //         username,
        //         mail,
        //         password
        //     }),
        // })  
        const userDataService = createUserDataService();
        userDataService.create(JSON.stringify({
            username,
            mail,
            password
        }))  
        .then(res => {
            navigate('/login')
        })
        .catch(err => {
             console.log(err)
             navigate('/sign-up')
        });
    }
 
    console.log(`La reponse est : ${response}`);

    const pwdChecker = ()=>{      
    
        if( qs(".pswd").value !== qs(".cpswd").value ){
            qs(".boxCpswd").style.backgroundColor="pink";
            qs(".notif-log").style.display="block";
            qs(".notif").innerText = 'no match between your password';
            qs('#btn-submit-login').disabled = true;
        }
        else{
            qs(".boxCpswd").style.backgroundColor="white";
            qs(".notif-log").style.display="none";
            qs(".notif").innerText = '';
            qs('#btn-submit-login').disabled = false;
        }
    }



return (
            
<div className="log-form">

<fieldset className="x-large pad-10 border bg-white">
    <legend className="clr-gray"> New account </legend>
    <span className="xx-font clr-gray"> Marketplace </span>
</fieldset>
 
<form onSubmit={onSubmit} className="bg-white">
    <div className="item-form marge-top-10">
        <div className="inputs">
            <img src="./img/icons8-composing-mail-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="text" name="username" id="checkbox" className="input username" placeholder="username.." />
        </div>
        <div className="inputs">
            <img src="./img/icons8-composing-mail-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="text" name="mail" id="checkbox" className="input mail" placeholder="mail.." />
        </div>
        <div className="inputs">
            <img src="./img/icons8-forgot-password-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="password" name="password" id="password" className="input pswd" placeholder="password.." />
        </div>
        <div className="inputs boxCpswd">
            <img src="./img/icons8-forgot-password-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="password" name="confirmPassword" id="password" className="input cpswd" placeholder="confirm password.." onKeyUp={pwdChecker} />
        </div>
    </div>    
    <input type="submit" className="btn-submit x-large font bold clr-white" id="btn-submit-login" value="Connect"/>
</form>

<div className="x-large pad-10 bg-pink notif-log">
   <span className="clr-white notif"> </span>
</div>

</div>

)
}
