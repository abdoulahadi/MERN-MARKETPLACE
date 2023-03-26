const db = require("../models");
const User = db.users;

exports.create = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    if(!username || !mail || !password ){
        return res.status(400).json({ message: "Veuillez remplir les champs obligatoires." });
    }

    const user = new User({ username, mail, password });

    await user.save();
    res.status(201).json({ message: 'Produit créé avec succès', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du user' });
  }
};