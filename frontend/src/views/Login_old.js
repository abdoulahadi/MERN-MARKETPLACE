import React, { Component } from "react";
// import { Home } from './Home.js';
 
export class Login extends Component {

constructor(props) {
    super(props);
    this.state = { 
        mail : '',
        password : '',
        query : ''
    };

    this.onSubmit = this.onSubmit.bind(this);
}

entryMail = (e)=>{ this.setState( { mail : e.target.value } ) }

entryPassword = (e)=>{ this.setState( { password : e.target.value } ) }

onSubmit = (e)=>{
    e.preventDefault();
    const { mail, password, query } = this.state;
    console.log( { mail, password, query } );
    fetch( "http://localhost:8080/shops" , {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({
            mail,
            password, 
        })
    })       
    .then(res => res.json())
    .then(res => this.setState({ myshop  : res }))
    .catch(err => err);
}



// connexion = ()=> {
//     if( this.state.mail === "manemamadouyaya@gmail.com" && this.state.password === "Passer@123" ) {
//         this.state.query = '/';
//         alert(this.state.query);
//         window.sessionStorage.setItem('name','softDev');  // define the session of name
//         window.sessionStorage.setItem('mail','manemamadouyaya@gmail.com'); // define the session of mail
//         return <div> <Home /> </div> ; 
         
//     }
//     else {
//         this.state.query = '/sign-in';
//         return <div> <Signin /> </div> ; 
//     }
//     alert( this.state.query);
// }

render() {

    return (
      
<div className="log-form">

<fieldset className="x-large pad-10 border bg-white">
    <legend className="clr-gray"> Connexion </legend>
    <span className="xx-font clr-gray"> Marketplace </span>
</fieldset>
 
<form onSubmit={this.onSubmit} className="bg-white">

    <div className="item-form marge-top-10">
        <div className="inputs">
            <img src="./img/icons8-composing-mail-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="text" name="mail" id="checkbox" className="input" placeholder="mail.." required onChange={this.entryMail} />
        </div>

        <div className="inputs">
            <img src="./img/icons8-forgot-password-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="password" name="password" id="password" className="input" placeholder="password.." required onChange={this.entryPassword} />
        </div>
        
        <a href="/new-account" className="clr-gray"> create account now ! </a> 

    </div>
    <input type="submit" className="btn-submit x-large font bold clr-white" value="Connect" />
</form>

<div className="x-large pad-10 bg-pink">
    <span className="clr-white"> {this.state.mail + ' ' + this.state.password} </span>
</div>

</div>

)
}

}


// export default Signin;