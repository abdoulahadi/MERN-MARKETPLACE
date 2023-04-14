import React, { Component } from "react";
//import { useNavigate } from "react-router-dom";

export class Signup extends Component {

constructor(props) {
    super(props);
    this.state = { 
        username:'',
        mail : '',
        password : '',
        confirmPassword : '',
        msg :'',
    };

}

id = ($item)=>{ return  document.getElementById($item) }

entryUserName = (e)=>{ this.setState( { username : e.target.value } ) }

entryMail = (e)=>{ this.setState( { mail : e.target.value } ) }

entryPassword = (e)=>{ this.setState( { password : e.target.value } ) }

entryConfirmPassword = (e)=>{ 
    this.setState( { confirmPassword : e.target.value } )
    setInterval( ()=>{
        if( this.state.password !== this.state.confirmPassword ){
            e.target.style.backgroundColor="pink";
            this.id('btn-submit-login').disabled = true;
        }
        else{
            e.target.style.backgroundColor="white";
            this.id('btn-submit-login').disabled = false;
        }
    }, 100)   
}


onSubmit = (e)=>{
    e.preventDefault();
   //const navigate = useNavigate()
    const { username, mail, password, confirmPassword, msg } = this.state;
    console.log( { username, mail, password, confirmPassword, msg } );
    fetch( "http://localhost:8080/user", {
        method : "POST",
        crossDomain : true,
        headers : { 
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-control-Allow-Origin":"*",
        },
        body : JSON.stringify({
            username,
            mail,
            password
        }),
    })     
    .then(res => res.json())
    .then(res => this.setState({ msg  : res }))
    .catch(err => err);

   // navigate("/login")
    //  useNavigate('/sign-in');
}



//   componentDidMount() {
//     this.onSubmit();
//    }

render() {

 
//const navigate = useNavigate()
      
    return (
            
<div className="log-form">

<fieldset className="x-large pad-10 border bg-white">
    <legend className="clr-gray"> New account </legend>
    <span className="xx-font clr-gray"> Marketplace </span>
</fieldset>
 
<form onSubmit={this.onSubmit} className="bg-white">
    <div className="item-form marge-top-10">
        <div className="inputs">
            <img src="./img/icons8-composing-mail-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="text" name="username" id="checkbox" className="input" placeholder="username.." required onChange={this.entryUserName} />
        </div>
        <div className="inputs">
            <img src="./img/icons8-composing-mail-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="text" name="mail" id="checkbox" className="input" placeholder="mail.." required onChange={this.entryMail} />
        </div>
        <div className="inputs">
            <img src="./img/icons8-forgot-password-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="password" name="password" id="password" className="input" placeholder="password.." required onChange={this.entryPassword} />
        </div>
        <div className="inputs">
            <img src="./img/icons8-forgot-password-24.png" alt="Home icon" width="24px" height="24px"/>
            <input type="password" name="confirmPassword" id="password" className="input" placeholder="confirm password.." required onChange={this.entryConfirmPassword} />
        </div>
    </div>
    {/* <button type="submit" className="btn-submit x-large font bold clr-white" id="btn-submit-login" value="Connect"> Connect </button> */}
    
    <input type="submit" className="btn-submit x-large font bold clr-white" id="btn-submit-login" value="Connect"/>
</form>

<div className="x-large pad-10 bg-pink">
   <span className="clr-white"> {this.state.msg } </span>
</div>

</div>

)
}
}