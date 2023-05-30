const { Sequelize } = require("sequelize");

// On récupère les variables d'environnement
const { DB_SERVER , DB_DATABASE , DB_USERNAME , DB_PASSWORD } = process.env

// DB_SERVER -> Nom du serveur MSSQL
// DB_DATABASE -> Nom de la db dans laquelle sequelize doit créer les tables
// DB_USERNAME -> Nom du username avec lequel vous souhaitez vous connecter
// DB_PASSWORD -> Password de cet utilisateur

// On doit créer une nouvelle instance de sequelize
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host : DB_SERVER,
    dialect : 'mssql' //-> install tedious
})

// Création d'un objet db
const db = {}

// Ajout de l'instance sequelize à notre objet db
db.sequelize = sequelize;

// Ajout des modèles à notre objet db (en leur fournissant l'instance de sequelize créée)
db.Product = require('./product.model')(sequelize)

// Normalement avec cas plus grand, ajout des relations entre chacun des modèles


// export de l'objet db
module.exports = db;