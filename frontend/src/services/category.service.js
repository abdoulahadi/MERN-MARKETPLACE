import createAxiosInstance from "../http-common";

class CategoryDataService {
    constructor(contentType = "application/json") {
        this.http = createAxiosInstance(contentType);
      }
  getAllCategories() {
    return this.http.get("/categories");
  }
}

export const createCategoryDataService = (contentType = "application/json") => {
    return new CategoryDataService(contentType);
  };