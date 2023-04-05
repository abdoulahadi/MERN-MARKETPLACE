import React, {Component} from "react";

export class Allshop extends Component {

    constructor(props) {
        super(props);
        this.state = { 
           allshop : props.data
        };
    }

//  getShops() {
//     fetch( "http://localhost:9000/shops" )       
//       .then(res => res.json())
//       .then(res => this.setState({ myshop  : res }))
//       .catch(err => err);
//   }

  // componentDidMount() {
  //   this.getShps();
  // }

render() {    

return (

<div className="x-large">

{this.state.allshop.map( row => (   
   <a href={'/shop/'+row.id}> <div className="large shadow pad-10 row-sb-sml">
        <img src={'../img/'+row.image} alt="Home icon" width="260px" height="160px"/>
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