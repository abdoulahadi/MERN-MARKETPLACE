import React, {Component} from "react";
import {createVendeurDataService} from "../services/vendeur.service";

export class Allshop extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           allshop : []
        };
    }
    componentDidMount() {
        this.getShps();
      }
    getShps(){
        const vendeurDataService = createVendeurDataService();
        vendeurDataService.getAll()
          .then(response => {
            this.setState({ allshop  : response.data })
          })
          .catch(err => err);
    }

render() {    

return (

<div className="x-large">

{this.state.allshop.map( row => (   
   <a href={'/shop/'+row.id} key={row.id}> <div className="large shadow pad-10 row-sb-sml">
        <img src={"http://localhost:8080/" + row.image} alt={row.name} width="260px" height="160px"/>
        <div className="bg-grey pad-10 col">
            <span className="clr-gray row"> {row.description}  </span>
            <span className="clr-gray row"> shop : {row.name}  </span>
        </div>
    </div> </a> 
))}

</div>
    )
}
}