import createAxiosInstance from "../http-common";

class ProductDataService {
    constructor(contentType = "application/json") {
        this.http = createAxiosInstance(contentType);
      }
  getAll() {
    return this.http.get("/products");
  }

  getNewProduct() {
    return this.http.get("/products/newProducts");
  }

  get(id) {
    return this.http.get(`/products/${id}`);
  }

  create(data) {
    return this.http.post("/products", data);
  }

  update(id, data) {
    return this.http.put(`/products/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`products/${id}`);
  }

  findByName(name,category='') {
    return this.http.get(`/products?name=${name}&category=${category}`);
  }

  findByCategory(category) {
    return this.http.get(`/products/category/${category}`);
  }

  findByVendeur(vendeur) {
    return this.http.get(`/products/vendeur/${vendeur}`);
  }
}

export const createProductDataService = (contentType = "application/json") => {
    return new ProductDataService(contentType);
  };
