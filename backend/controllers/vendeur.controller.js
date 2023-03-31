const db = require("../models");
const upload = require("../config/multer.config");
const multer = require("multer");
const fs = require("fs");
const Vendeur = db.vendeurs;

exports.create = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Erreur lors du téléchargement de l'image." });
    } else if (err) {
      return res.status(500).json({ message: "Une erreur s'est produite lors du téléchargement de l'image." });
    }
  try {
    const user = req.body.user;
    const name = req.body.name;
    const description = req.body.description;

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
    const newVendeur = new Vendeur({
       user,
       name, 
       image:req.file.path,
       description,
       isVerified: true 
      });
    await newVendeur.save();

    return res.status(200).json({ message: "Vendeur créé avec succès", newVendeur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du vendeur.' });
  }
});
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
    const vendeur = await Vendeur.findBy(idVendeur);

    if(!vendeur){
      return res.status(404).json({message:"Aucune vendeur n'a été trouvé pour cet identifiant."});
    }
    // Suppression de tous les produits liés au vendeur
    await Product.deleteMany({ vendeur: idVendeur });

    // Suppression du vendeur
    await Vendeur.findByIdAndDelete(idVendeur);
    return res.status(200).json({message: "Suppression complète du vendeur et de ses produits."});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Une erreur est survenue lors de la suppression du vendeur"})
  }
};

exports.updateVendeur = async (req, res) => {
  try {
    const idVendeur = req.params.idVendeur;
    let vendeur = await Vendeur.findById(idVendeur);
    if (!vendeur) {
      return res.status(404).json({ message: "Aucun vendeur n'a été trouvé pour cet identifiant." });
    }
    let imagePath = vendeur.image; 
    upload.single('image')(req, res, async (err) => { 
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Erreur lors du téléchargement de l'image." });
      } else if (err) {
        return res.status(500).json({ message: "Une erreur s'est produite lors du téléchargement de l'image." });
      }
      if (req.file) { 
        if (imagePath) { 
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
        imagePath = req.file.path; 
      }
      vendeur = await Vendeur.findByIdAndUpdate(idVendeur, { ...req.body, image: imagePath }, { new: true });
      return res.status(200).json({ message: "Mise à jour complète du vendeur", vendeur });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du vendeur" });
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