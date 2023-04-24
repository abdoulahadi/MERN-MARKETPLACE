import createAxiosInstance from "../http-common";

class AuctionDataService {
  constructor(contentType = "application/json") {
    this.http = createAxiosInstance(contentType);
  }

  create(idVendeur,data) {
    return this.http.post(`/auctions/${idVendeur}/create`, data);
  }

  cancel(idAuction,idVendeur,data) {
    return this.http.post(`/auctions/${idAuction}/cancel/${idVendeur}`,data);
  }

  placeBid(idAuction,idUser,data){
    return this.http.post(`/auctions/${idAuction}/bid/${idUser}`,data);
  }

  active(){
    return this.http.get(`/auctions/active`,);
  }

  details(idAuction){
    return this.http.get(`/auctions/${idAuction}/details`,);
  }
  
}

export const createAuctionDataService = (contentType = "application/json") => {
  return new AuctionDataService(contentType);
};
