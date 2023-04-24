module.exports = app => {
    const auctions = require("../controllers/auction.controller.js");
    var router = require("express").Router();
  
    router.get("/active",auctions.getActiveAuctions)
    
    router.get("/:auctionId/details",auctions.getAuctionDetails)

    router.post("/:auctionId/update-status", async (req, res) => {
      const auctionId = req.params.auctionId;
      try {
        await auctions.updateAuctionsStatus(auctionId);
        res.status(200).json({ message: "Auction status updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    
    // Créer un enchère....
    router.post("/:idVendeur/create", auctions.createAuction);

    router.post("/:auctionId/cancel/:vendeurId",auctions.cancelAuction)

    // Placer un enchère...
    router.post("/:auctionId/bid/:userId",auctions.placeBid);

    
    app.use("/auctions", router);
  };
  