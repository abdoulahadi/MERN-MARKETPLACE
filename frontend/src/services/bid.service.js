import createAxiosInstance from "../http-common";

class BidDataService {
  constructor(contentType = "application/json") {
    this.http = createAxiosInstance(contentType);
  }

  create(data) {
    return this.http.post("/bids", data);
  }
}

export const createBidDataService = (contentType = "application/json") => {
  return new BidDataService(contentType);
};
