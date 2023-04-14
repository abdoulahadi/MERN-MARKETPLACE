import createAxiosInstance from "../http-common";

class CommandeDataService {
    constructor(contentType = "application/json") {
        this.http = createAxiosInstance(contentType);
      }
  create(data) {
    return this.http.post("/commandes", data);
  }

  addCart(data) {
    return this.http.patch("/commandes/ajouter-produit", data);
  }
  AllwithdrawCart(data) {
    return this.http.patch("/commandes/retirer-produits", data);
  }
  OnewithdrawCart(data) {
    return this.http.patch("/commandes/retirer-produit", data);
  }

  payment(id, data) {
    return this.http.post(`/commandes/${id}/paiement`, data);
  }

  getProductsCart(id){
    return this.http.get(`/commandes/${id}/afficher-produits`);
  }
  getAllCommandesByUserId(id){
    return this.http.get(`/commandes/${id}`);
  }
}

export const createCommandeDataService = (contentType = "application/json") => {
    return new CommandeDataService(contentType);
  };