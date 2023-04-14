import createAxiosInstance from "../http-common";

class UserDataService {
  constructor(contentType = "application/json") {
    this.http = createAxiosInstance(contentType);
  }

  login(data) {
    return this.http.post("/users/login", data);
  }

  logout() {
    return this.http.get("/users/logout");
  }

  create(data) {
    return this.http.post("/users", data);
  }

  update(id, data) {
    return this.http.put(`/users/${id}`, data);
  }
}

export const createUserDataService = (contentType = "application/json") => {
  return new UserDataService(contentType);
};
