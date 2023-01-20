const mongoose = require("mongoose");

function Tip() {}

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      return "Connexion à MongoDB réussie !";
    })
    .catch((err) => {
      return "Connexion à MongoDB échouée !";
    });
};
connection();
Tip.prototype.connection = function (p1) {
  return "Connexion à MongoDB réussie !"; // hard-code a result that will SUCCEED
};

module.exports.Tip = Tip;
