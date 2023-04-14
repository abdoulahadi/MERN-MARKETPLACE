import createAxiosInstance from "../http-common";

class VendeurDataService {
  constructor(contentType = "application/json") {
    this.http = createAxiosInstance(contentType);
  }

  create(data) {
    return this.http.post("/vendeurs", data);
  }

  getAll() {
    return this.http.get("/vendeurs");
  }

  getNewVendeurs() {
    return this.http.get("vendeurs/newVendeurs");
  }

  getAllVendeursByUserId(userId) {
    return this.http.get(`/vendeurs?userId=${userId}`);
  }

  get(id) {
    return this.http.get(`/vendeurs/${id}`);
  }

  update(id, data) {
    return this.http.put(`/vendeurs/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`vendeurs/${id}`);
  }

  findByName(name) {
    return this.http.get(`/vendeurs?name=${name}`);
  }
}

export const createVendeurDataService = (contentType = "application/json") => {
    return new VendeurDataService(contentType);
  };