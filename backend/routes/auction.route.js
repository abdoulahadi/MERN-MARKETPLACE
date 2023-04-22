module.exports = app => {
    const auctions = require("../controllers/auction.controller.js");
    var router = require("express").Router();
  
    router.get("/active",auctions.getActiveAuctions)
    
    router.get("/:auctionId/details",auctions.getAuctionDetails)
    // Créer un enchère....
    router.post("/:idVendeur", auctions.createAuction);
    router.post("/cancelled/:auctionId/:vendeurId",auctions.getActiveAuctions)
    // Placer un enchère...
    router.post("/:auctionId/:userId",auctions.placeBid);

    
    app.use("/auctions", router);
  };
  