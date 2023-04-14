import React,{ useState, useEffect } from "react";
import { createCommandeDataService } from "../services/commande.service";

export function Profile(props) {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [commandes, setCommandes] = useState([]);

  useEffect(()=>{
    const commandeDataService = createCommandeDataService();
    commandeDataService.getAllCommandesByUserId(JSON.parse(sessionStorage.getItem("user")).id)
    .then((res)=>{
        setCommandes(res.data)
    }).catch((err)=>{
        console.log(err)
    })
  },[])
  function handleChangePassword() {
    // Send oldPassword and newPassword to backend for processing
    console.log("Old password:", oldPassword);
    console.log("New password:", newPassword);
  }
  return (
    <div>
      <div className="large row-sml gap-20">
        <div className="large-5 col gap-20">
          <div className="col x-large border bg-white pad-20 radius-20">
            <span className="clr-gray">
              username : {JSON.parse(sessionStorage.getItem("user")).username}
            </span>
            <span className="clr-gray">
              mail : {JSON.parse(sessionStorage.getItem("user")).mail}
            </span>
          </div>
        </div>
        <div className="large-5">
          <div className="x-large bg-white radius-20 pad-20 col border">
            <div className="x-large border-btm row">
              <span className="clr-gray">Change Your Password</span>
            </div>
            <div className="col">
                <form>
              <div className="inputs marge-top-10 marge-4">
                <input
                  type="password"
                  name="old_password"
                  id="old_password"
                  className="input"
                  placeholder="Old password.."
                  autoComplete="new-password"
                  required
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
              </div>
              <div className="inputs marge-4">
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  className="input"
                  placeholder="New password.."
                  required
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
                </form>
            </div>
            <input
              type="submit"
              className="link-submit font bold clr-white marge-top-30"
              value="Save info"
              onClick={handleChangePassword}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="large clr-bleue">Vos Commandes</h1>
{commandes.length > 0 ?
commandes.map((command, index)=>{
        return(
            <div className="large shadow pad-10 bg-white row-sb-sml" key={index}>
          <div className="x-large row-y-ctr">
            <img
              src="../img/icons8-shopping-mall-100.png"
              alt="Home icon"
              width="50px"
              height="50px"
            />
            <div className="pad-10 col">
              <span className="clr-gray">
                {" "}
                Product length : {command.produits.length}
                {" "}
              </span>
              <span className="clr-gray"> Total Price : {parseFloat(command.prixTotal).toFixed(2)} $</span>
            </div>
          </div>
          {command.paiementEffectue ?
        <span className="link-submit link-submit_profile font bold clr-white bg-green">
        {" "}
        Valider
        {" "}
      </span>  
      :
          <span className="link-submit link-submit_profile font bold clr-white bg-orange">
            {" "}
            En-Cours
            {" "}
          </span>
        }
        </div>
        )

})
:<span className="large clr-gray">Aucun Commande n'est disponible </span>
}
      </div>
    </div>
  );
}
