const db = require("../models");
const bcrypt = require('bcrypt');
const User = db.users;

exports.create = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    if (!username || !mail || !password) {
      return res.status(400).json({ message: "Veuillez remplir les champs obligatoires." });
    }

    const user = new User({ username, mail, password });

    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    // Vérifie la validité du mot de passe

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Stocke l'utilisateur dans l'objet de requête pour une utilisation ultérieure
    req.user = user;

    // Crée un objet qui contient les informations à envoyer à la partie front
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      // Ajoute d'autres informations si nécessaire
    };

    // Envoie la réponse avec les informations de l'utilisateur connecté
    res.status(200).json({ user: userData });


  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(400).json({
        error: 'Utilisateur non trouvé'
      });
    }
    res.json({
      message: 'Utilisateur supprimé avec succès'
    });
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la commande' });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Utilisateur non trouvé'
      });
    }
    res.json(user);
  });
};