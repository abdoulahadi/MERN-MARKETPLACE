import createAxiosInstance from "../http-common";

class CommandeDataService {
    constructor(contentType = "application/json") {
        this.http = createAxiosInstance(contentType);
      }
  create(data) {
    return this.http.post("/commandes", data);
  }

  addCart(id, data) {
    return this.http.post(`/commandes/${id}/ajouter-produit`, data);
  }
  withdrawCart(id, data) {
    return this.http.post(`/commandes/${id}/retirer-produit`, data);
  }

  payment(id, data) {
    return this.http.post(`/commandes/${id}/paiement`, data);
  }

  delete(id) {
    return this.http.delete(`/commandes/${id}`);
  }
}

export const createCommandeDataService = (contentType = "application/json") => {
    return new CommandeDataService(contentType);
  };