const db = require("../models");
const Vendeur = db.vendeurs;

exports.create = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(400).json({ message: "Le user n'est pas renseigné" });
    }

    // Vérifier si un vendeur existe déjà pour cet utilisateur
    const existingVendeur = await Vendeur.findOne({ user });
    if (existingVendeur) {
      return res
        .status(400)
        .json({ message: "Un vendeur existe déjà pour cet utilisateur." });
    }

    // Créer un nouveau vendeur
    const newVendeur = new Vendeur({ user, isVerified: true });
    await newVendeur.save();

    return res.status(200).json({ message: "Vendeur créé avec succès", newVendeur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du vendeur.' });
  }
};

exports.getAllVendeur = async(req,res) =>{
  try {
    const vendeurs = await Vendeur.find({isVerified: true}).populate("user");
    return res.status(200).json(vendeurs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'Une erreur est sourvenue lors de la récupération des vendeurs'});
  }
};

exports.getVendeurById = async(req,res) =>{
  try {
    const idVendeur = req.params.idVendeur
    const vendeur = await Vendeur.findById(idVendeur).populate("user");

    if(!vendeur){
      return res.status(404).json({message:"Aucune vendeur n'est affilié à cet id"});
    }
    return res.status(200).json(vendeur);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Une erreur est survenue lord de la récupération du vendeur en fonction de l'id"});
  }
};

exports.deleteVendeur = async(req,res) =>{
  try {
    const idVendeur = req.params.idVendeur;
    const vendeur = await Vendeur.findByIdAndDelete(idVendeur);

    if(!vendeur){
      return res.status(404).json({message:"Aucune vendeur n'est trouvé pour cet identifiant."});
    }
    return res.status(200).json({message: "Suppression complète du vendeurs."});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Une erreur est survenue lors de la suppression du vendeur"})
  }
};

exports.updateVendeur = async(req,res)=>{
  try {
    const idVendeur = req.params.idVendeur;
    const vendeur = await Vendeur.findByIdAndUpdate(idVendeur, req.body,{new:true});
    if(!vendeur){
      return res.status(404).json({message:"Aucune vendeur n'est trouvé pour cet identifiant."});
    }
    return res.status(200).json({message:"Mise à jour complète du vendeur",vendeur})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Une erreur est survenue lors de la mise à jour du vendeur"})
  }
};

exports.getNewVendeurs = async(req,res) =>{
  try {
    const newVendeurs = await Vendeur.find({isVerified:true}).sort({createdAt:-1})
                                            .limit(10)
                                            .populate("user");
    return res.status(200).json(newVendeurs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Une erreur est survenue lors de la récupération des nouveaux vendeurs"})
  }
};